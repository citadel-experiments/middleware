import ApiClient, { ListfundsState, ListinvoicesStatus, PayRequest, WaitsendpayStatus } from "@core-ln/core";
import { v4 as uuidv4 } from "uuid";
import ILightningClient, { extendedPaymentRequest } from "./abstract.js";
import {
  Channel,
  ChannelBalanceResponse,
  ChannelCloseSummary,
  ChannelPoint,
  EstimateFeeResponse,
  FeeReportResponse,
  ForwardingEvent,
  ForwardingHistoryResponse,
  GenSeedResponse,
  GetInfoResponse,
  Invoice,
  ListInvoiceResponse,
  ListPaymentsResponse,
  ListUnspentResponse,
  NewAddressResponse,
  PendingChannelsResponse,
  SendCoinsResponse,
  SendResponse,
  Transaction,
  Utxo,
  WalletBalanceResponse,
  Invoice_InvoiceState,
} from "./autogenerated-types.js";

function convertToLndState(status: ListinvoicesStatus): Invoice_InvoiceState {
  switch (status) {
    case ListinvoicesStatus.Paid:
      return Invoice_InvoiceState.SETTLED;
    case ListinvoicesStatus.Expired:
      return Invoice_InvoiceState.CANCELED;
    default:
      return Invoice_InvoiceState.OPEN;
  }
}
const Uint8ArrayFromHexString = (hexString: string) =>
  new Uint8Array(
    (hexString.match(/.{1,2}/g) as RegExpMatchArray).map((byte) =>
      parseInt(byte, 16)
    )
  );

export default class CLightningService implements ILightningClient {
  readonly hasBolt12 = true;
  apiClient: ApiClient;
  constructor(socketPath: string) {
    this.apiClient = new ApiClient(socketPath);
  }

  // an amount, an options memo, and can only be paid to node that created it.
  async addInvoice(
    amount: number | string,
    memo: string
  ): Promise<{
    rHash: Uint8Array;
    paymentRequest: string;
  }> {
    const invoice = await this.apiClient.invoice({
      msatoshi: parseInt(amount.toString()) * 1000,
      description: memo,
      label: memo + uuidv4(),
      expiry: 3600,
    });

    return {
      rHash: Uint8ArrayFromHexString(invoice.payment_hash),
      paymentRequest: invoice.bolt11,
    };
  }

  async closeChannel(
    fundingTxId: string,
    index: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    force: boolean
  ): Promise<void> {
    await this.apiClient.close({ id: `${fundingTxId}:${index}` });
  }

  // Connects this lnd node to a peer.
  async connectToPeer(
    pubKey: string,
    ip: string,
    port: number | string
  ): Promise<void> {
    await this.apiClient.connect({
      id: pubKey,
      host: ip,
      port: parseInt(port.toString()),
    });
  }

  async decodePaymentRequest(
    paymentRequest: string
  ): Promise<extendedPaymentRequest> {
    const decoded = await this.apiClient.decode({ string: paymentRequest });
    if(decoded.valid && decoded.type === "bolt11 invoice")
      return {
        paymentRequest,
        destination: decoded.payee,
        paymentHash: decoded.payment_hash,
        numSatoshis: Number((decoded.amount_msat as bigint) / 1000n),
        timestamp: decoded.created_at,
        expiry: decoded.created_at + decoded.expiry,
        description: decoded.description as string,
        descriptionHash: decoded.description_hash as string,
        numMsat: Number(decoded.amount_msat),
      };
    if(decoded.valid && decoded.type === "bolt12 invoice")
      return {
        paymentRequest,
        destination: decoded.node_id,
        vendor: decoded.vendor,
        paymentHash: decoded.payment_hash,
        numSatoshis: decoded.amount_msat ? Number(decoded.amount_msat / 1000n) : undefined,
        timestamp: decoded.created_at,
        expiry: (decoded.created_at + decoded.relative_expiry) || undefined,
        description: decoded.description as string,
        numMsat: Number(decoded.amount_msat) || undefined,
      };
    throw new Error("Failed to decode invoice");
  }

  async estimateFee(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    address: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    amt: number | string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    confTarget: number
  ): Promise<EstimateFeeResponse> {
    throw new Error("Not implemented for c-lightning yet");
  }

  async generateAddress(): Promise<NewAddressResponse> {
    const address = await this.apiClient.newaddr();
    return {
      address,
    };
  }

  async generateSeed(): Promise<GenSeedResponse> {
    throw new Error("Not supported on c-lightning");
  }

  async getChannelBalance(): Promise<ChannelBalanceResponse> {
    const channels = (await this.apiClient.listfunds()).channels;
    let localBalance = 0n;
    let remoteBalance = 0n;
    channels.forEach((channel) => {
        localBalance += channel.our_amount_msat;
        remoteBalance += channel.amount_msat - channel.our_amount_msat;
    });
    return {
      localBalance: {
        sat: Number(localBalance / 1000n),
        msat: Number(localBalance),
      },
      remoteBalance: {
        sat: Number(remoteBalance / 1000n),
        msat: Number(remoteBalance),
      },
    };
  }

  async getFeeReport(): Promise<FeeReportResponse> {
    throw new Error("Not supported by c-lightning yet.");
  }

  async getForwardingEvents(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startTime: number | string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endTime: number | string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    indexOffset: number
  ): Promise<ForwardingHistoryResponse> {
    const forwards = await this.apiClient.listforwards();
    const forwardingEvents: ForwardingEvent[] = forwards.forwards.map(
      (forward) => {
        return {
          chanIdIn: forward.in_channel,
          chanIdOut: forward.out_channel as string,
          amtIn: Number(forward.in_msat / 1000n),
          /**
           * The total amount (in satoshis) of the outgoing HTLC that created the
           * second half of the circuit.
           */
          amtOut: Number((forward.out_msat as bigint) / 1000n),
          /** The total fee (in satoshis) that this payment circuit carried. */
          fee: Number((forward.fee_msat as bigint) / 1000n),
          /** The total fee (in milli-satoshis) that this payment circuit carried. */
          feeMsat: Number(forward.fee_msat as bigint),
          /**
           * The total amount (in milli-satoshis) of the incoming HTLC that created
           * half the circuit.
           */
          amtInMsat: Number(forward.in_msat),
          /**
           * The total amount (in milli-satoshis) of the outgoing HTLC that created
           * the second half of the circuit.
           */
          amtOutMsat: Number(forward.out_msat as bigint),
          /**
           * The number of nanoseconds elapsed since January 1, 1970 UTC when this
           * circuit was completed.
           */
          timestampNs: forward.received_time,
        };
      }
    );
    return {
      forwardingEvents: forwardingEvents,
      // Not working on c-lightning
      lastOffsetIndex: 0,
    };
  }

  async isOperational(): Promise<boolean> {
    // TODO: Actual check
    return true;
  }

  async getInfo(): Promise<GetInfoResponse> {
    const info = await this.apiClient.getinfo();
    return {
      version: info.version,
      identityPubkey: info.id,
      alias: info.alias,
      color: info.color,
      numPendingChannels: info.num_pending_channels,
      numActiveChannels: info.num_active_channels,
      numInactiveChannels: info.num_inactive_channels,
      numPeers: info.num_peers,
      blockHeight: info.blockheight,
      blockHash: "TODO",
      bestHeaderTimestamp: 1,
      syncedToChain: !info.warning_bitcoind_sync,
      syncedToGraph: true,
      chains: [
        {
          chain: "bitcoin",
          network: "mainnet",
        },
      ],
      uris: [],
    };
  }

  async getNodeAlias(
    pubKey: string,
  ): Promise<string> {
    const nodeInfo = await this.apiClient.getnode(pubKey);
    return nodeInfo?.alias || "";
  }

  // Returns a list of lnd's currently open channels. Channels are considered open by this node and it's directly
  // connected peer after three confirmation. After six confirmations, the channel is broadcasted by this node and it's
  // directly connected peer to the broader Lightning network.
  async getOpenChannels(): Promise<Channel[]> {
    const channels = (await this.apiClient.listfunds()).channels;
    const lndChannels: Channel[] = [];
    for (const channel of channels) {
      if(channel.state == ListfundsState.ChanneldNormal)
        lndChannels.push({
          active: true,
          remotePubkey: channel.peer_id,
          channelPoint: `${channel.funding_txid}:${channel.funding_output}`,
          chanId: "",
          capacity: Number(channel.amount_msat / 1000n),
          localBalance: Number(channel.our_amount_msat / 1000n),
          remoteBalance: Number(channel.amount_msat / 1000n) - Number(channel.our_amount_msat / 1000n),
        });
    }
    return lndChannels;
  }

  async getClosedChannels(): Promise<ChannelCloseSummary[]> {
    //const channels = (await this.apiClient.listfunds()).channels;
    // TODO: Implement
    return [];
  }

  // Returns a list of all outgoing payments.
  async getPayments(): Promise<ListPaymentsResponse> {
    return {
      payments: [],
      firstIndexOffset: 0,
      lastIndexOffset: 0
    }
    //throw new Error("Not supported by c-lightning yet.");
  }

  // Returns a list of all connected peer's pubkeys.
  async getPeerPubkeys(): Promise<string[]> {
    const peers = await this.apiClient.listpeers();
    
    return peers.peers.map((peer) => peer.id);
  }

  // Returns a list of lnd's currently pending channels. Pending channels include, channels that are in the process of
  // being opened, but have not reached three confirmations. Channels that are pending closed, but have not reached
  // one confirmation. Forced close channels that require potentially hundreds of confirmations.
  async getPendingChannels(): Promise<PendingChannelsResponse> {
    return {
      totalLimboBalance: 0,
      pendingOpenChannels: [],
      pendingForceClosingChannels: [],
      waitingCloseChannels: [],
    }
  }

  async getWalletBalance(): Promise<WalletBalanceResponse> {
    const data = await this.apiClient.listfunds();
    let confirmedBalanceMsat = 0n;
    let unconfirmedBalanceMsat = 0n;
    data.outputs.forEach((output) => {
      if (output.status === "confirmed")
        confirmedBalanceMsat += output.amount_msat;
      else if(output.status === "unconfirmed")
        unconfirmedBalanceMsat += output.amount_msat;
    });
    return {
      /** The balance of the wallet */
      totalBalance: Number(
        (confirmedBalanceMsat + unconfirmedBalanceMsat) / 1000n
      ),
      /** The confirmed balance of a wallet(with >= 1 confirmations) */
      confirmedBalance: Number(confirmedBalanceMsat / 1000n),
      /** The unconfirmed balance of a wallet(with 0 confirmations) */
      unconfirmedBalance: Number(unconfirmedBalanceMsat / 1000n),
      /** A mapping of each wallet account's name to its balance. */
      accountBalance: {},
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initWallet(mnemonic: string[]): Promise<string[]> {
    return ["this", "is", "not", "supported", "for", "c-lightning", "yet"];
  }

  // Returns a list of all invoices.
  async getInvoices(): Promise<ListInvoiceResponse> {
    const invoices = (await this.apiClient.listinvoices()).invoices;
    const invoicesLnd: Invoice[] = invoices.map((invoice) => {
      return {
        memo: invoice.description || "",
        value: Number((invoice.amount_msat || 0n) / 1000n),
        valueMsat: Number(invoice.amount_msat),
        paymentRequest: invoice.bolt11 || invoice.bolt12 || "",
        /** The state the invoice is in. */
        state: convertToLndState(invoice.status),
      }
    });
    return {
      invoices: invoicesLnd,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getInvoice(paymentHash: string): Promise<Invoice> {
    throw new Error("Not suported by c-lightning");
  }

  async isInvoiceSettled(paymentHash: string): Promise<boolean> {
    try {
      const invoiceData = await this.apiClient.waitsendpay({
        timeout: "0",
        payment_hash: paymentHash,
      });
      return invoiceData.status === WaitsendpayStatus.Complete;
    } catch {
      return false;
    }
  }

  // Returns a list of all on chain transactions.
  async getOnChainTransactions(): Promise<Transaction[]> {
    const transactions = await this.apiClient.listtransactions();
    const currentBlockHeight = parseInt(
      (await this.getInfo()).blockHeight.toString()
    );
    const newTransactions: Transaction[] = transactions.transactions.map(
      (transaction) => {
        return {
          /** The transaction hash */
          txHash: transaction.hash,
          /** The transaction amount, denominated in satoshis */
          amount: 0,
          /** The number of confirmations */
          numConfirmations: currentBlockHeight - transaction.blockheight,
          /** The hash of the block this transaction was included in */
          blockHash: "none",
          /** The height of the block this transaction was included in */
          blockHeight: transaction.blockheight,
          /** Timestamp of this transaction */
          timeStamp: 0,
          /** Fees paid for this transaction */
          totalFees: 0,
          /** Addresses that received funds for this transaction */
          destAddresses: [],
          /** The raw transaction hex. */
          rawTxHex: transaction.rawtx,
          /** A label that was optionally set on transaction broadcast. */
          label: "",
        };
      }
    );
    return newTransactions;
  }

  async listUnspent(): Promise<ListUnspentResponse> {
    const data = await this.apiClient.listfunds();
    const currentBlockHeight = parseInt(
      (await this.getInfo()).blockHeight.toString()
    );
    const utxos: Utxo[] = data.outputs.map((output) => {
      return {
        /** The address */
        address: output.address as string,
        /** The value of the unspent coin in satoshis */
        amountSat: Number(output.amount_msat / 1000n),
        /** The outpoint in format txid:n */
        outpoint: {
          txidStr: output.txid,
        },
        /** The number of confirmations for the Utxo */
        confirmations: output.blockheight
          ? currentBlockHeight - output.blockheight
          : 0,
      };
    });
    return {
      utxos
    }
  }

  async openChannel(
    pubKey: string,
    amt: number,
    satPerVbyte: number | undefined
  ): Promise<ChannelPoint> {
    const info = await this.apiClient.fundchannel({
      id: pubKey,
      amount: amt.toString(),
      feerate: satPerVbyte?.toString() || "normal",
    });
    return {
      fundingTxidStr: info.txid,
      outputIndex: info.outnum,
    };
  }

  async sendCoins(
    addr: string,
    amt: number | undefined,
    satPerVbyte?: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendAll?: boolean
  ): Promise<SendCoinsResponse> {
    const info = await this.apiClient.withdraw({
      destination: addr,
      satoshi: amt as number,
      feerate: satPerVbyte || "normal",
    });
    return { txid: info.txid };
  }

  async sendPaymentSync(
    paymentRequest: string,
    amt?: number
  ): Promise<SendResponse> {
    const req: PayRequest = { bolt11: paymentRequest };
    if(amt) req.msatoshi = (BigInt(amt) * 1000n).toString();
    const data = await this.apiClient.pay(req);
    return {
      paymentPreimage: data.payment_preimage,
      paymentRoute: undefined,
      paymentHash: data.payment_hash,
    };
  }

  async updateChannelPolicy(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    global: boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fundingTxid: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    outputIndex: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    baseFeeMsat: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    feeRate: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    timeLockDelta: number
  ): Promise<void> {
    throw new Error("Not implemented for c-lightning yet");
  }

  async getVersion(): Promise<string> {
    const info = await this.getInfo();
    return info.version;
  }

  async signMessage(message: string): Promise<string> {
    const response = await this.apiClient.signmessage({ message });
    return response.zbase;
  }

  async verifyMessage(
    message: string,
    signature: string
  ): Promise<{
    pubkey: string;
    valid: boolean;
  }> {
    try {
      const data = await this.apiClient.checkmessage({ message, zbase: signature });
      return {
        valid: data.verified,
        pubkey: data.pubkey as string,
      };
    } catch {
      return {
        pubkey: "unknown",
        valid: false,
      };
    }
  }

  async addOffer(amount: number | string, description: string): Promise<{
    bolt12: string;
    bolt12_unsigned: string;
  }> {
    const offerData = await this.apiClient.offer({
      amount: isNaN(Number(amount)) ? amount.toString() : `${amount}sat`,
      description
    });

    return offerData;
  }
}
