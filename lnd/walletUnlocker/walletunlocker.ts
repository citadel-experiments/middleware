import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { LightningClient as _lnrpc_LightningClient, LightningDefinition as _lnrpc_LightningDefinition } from './lnrpc/Lightning';
import type { WalletUnlockerClient as _lnrpc_WalletUnlockerClient, WalletUnlockerDefinition as _lnrpc_WalletUnlockerDefinition } from './lnrpc/WalletUnlocker';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  lnrpc: {
    AMP: MessageTypeDefinition
    AMPRecord: MessageTypeDefinition
    AbandonChannelRequest: MessageTypeDefinition
    AbandonChannelResponse: MessageTypeDefinition
    AddInvoiceResponse: MessageTypeDefinition
    AddressType: EnumTypeDefinition
    Amount: MessageTypeDefinition
    BakeMacaroonRequest: MessageTypeDefinition
    BakeMacaroonResponse: MessageTypeDefinition
    Chain: MessageTypeDefinition
    ChanBackupExportRequest: MessageTypeDefinition
    ChanBackupSnapshot: MessageTypeDefinition
    ChanInfoRequest: MessageTypeDefinition
    ChanPointShim: MessageTypeDefinition
    ChangePasswordRequest: MessageTypeDefinition
    ChangePasswordResponse: MessageTypeDefinition
    Channel: MessageTypeDefinition
    ChannelAcceptRequest: MessageTypeDefinition
    ChannelAcceptResponse: MessageTypeDefinition
    ChannelBackup: MessageTypeDefinition
    ChannelBackupSubscription: MessageTypeDefinition
    ChannelBackups: MessageTypeDefinition
    ChannelBalanceRequest: MessageTypeDefinition
    ChannelBalanceResponse: MessageTypeDefinition
    ChannelCloseSummary: MessageTypeDefinition
    ChannelCloseUpdate: MessageTypeDefinition
    ChannelConstraints: MessageTypeDefinition
    ChannelEdge: MessageTypeDefinition
    ChannelEdgeUpdate: MessageTypeDefinition
    ChannelEventSubscription: MessageTypeDefinition
    ChannelEventUpdate: MessageTypeDefinition
    ChannelFeeReport: MessageTypeDefinition
    ChannelGraph: MessageTypeDefinition
    ChannelGraphRequest: MessageTypeDefinition
    ChannelOpenUpdate: MessageTypeDefinition
    ChannelPoint: MessageTypeDefinition
    ChannelUpdate: MessageTypeDefinition
    CloseChannelRequest: MessageTypeDefinition
    CloseStatusUpdate: MessageTypeDefinition
    ClosedChannelUpdate: MessageTypeDefinition
    ClosedChannelsRequest: MessageTypeDefinition
    ClosedChannelsResponse: MessageTypeDefinition
    CommitmentType: EnumTypeDefinition
    ConfirmationUpdate: MessageTypeDefinition
    ConnectPeerRequest: MessageTypeDefinition
    ConnectPeerResponse: MessageTypeDefinition
    DebugLevelRequest: MessageTypeDefinition
    DebugLevelResponse: MessageTypeDefinition
    DeleteAllPaymentsRequest: MessageTypeDefinition
    DeleteAllPaymentsResponse: MessageTypeDefinition
    DeleteMacaroonIDRequest: MessageTypeDefinition
    DeleteMacaroonIDResponse: MessageTypeDefinition
    DisconnectPeerRequest: MessageTypeDefinition
    DisconnectPeerResponse: MessageTypeDefinition
    EdgeLocator: MessageTypeDefinition
    EstimateFeeRequest: MessageTypeDefinition
    EstimateFeeResponse: MessageTypeDefinition
    ExportChannelBackupRequest: MessageTypeDefinition
    Failure: MessageTypeDefinition
    Feature: MessageTypeDefinition
    FeatureBit: EnumTypeDefinition
    FeeLimit: MessageTypeDefinition
    FeeReportRequest: MessageTypeDefinition
    FeeReportResponse: MessageTypeDefinition
    FloatMetric: MessageTypeDefinition
    ForwardingEvent: MessageTypeDefinition
    ForwardingHistoryRequest: MessageTypeDefinition
    ForwardingHistoryResponse: MessageTypeDefinition
    FundingPsbtFinalize: MessageTypeDefinition
    FundingPsbtVerify: MessageTypeDefinition
    FundingShim: MessageTypeDefinition
    FundingShimCancel: MessageTypeDefinition
    FundingStateStepResp: MessageTypeDefinition
    FundingTransitionMsg: MessageTypeDefinition
    GenSeedRequest: MessageTypeDefinition
    GenSeedResponse: MessageTypeDefinition
    GetInfoRequest: MessageTypeDefinition
    GetInfoResponse: MessageTypeDefinition
    GetRecoveryInfoRequest: MessageTypeDefinition
    GetRecoveryInfoResponse: MessageTypeDefinition
    GetTransactionsRequest: MessageTypeDefinition
    GraphTopologySubscription: MessageTypeDefinition
    GraphTopologyUpdate: MessageTypeDefinition
    HTLC: MessageTypeDefinition
    HTLCAttempt: MessageTypeDefinition
    Hop: MessageTypeDefinition
    HopHint: MessageTypeDefinition
    InitWalletRequest: MessageTypeDefinition
    InitWalletResponse: MessageTypeDefinition
    Initiator: EnumTypeDefinition
    Invoice: MessageTypeDefinition
    InvoiceHTLC: MessageTypeDefinition
    InvoiceHTLCState: EnumTypeDefinition
    InvoiceSubscription: MessageTypeDefinition
    KeyDescriptor: MessageTypeDefinition
    KeyLocator: MessageTypeDefinition
    Lightning: SubtypeConstructor<typeof grpc.Client, _lnrpc_LightningClient> & { service: _lnrpc_LightningDefinition }
    LightningAddress: MessageTypeDefinition
    LightningNode: MessageTypeDefinition
    ListChannelsRequest: MessageTypeDefinition
    ListChannelsResponse: MessageTypeDefinition
    ListInvoiceRequest: MessageTypeDefinition
    ListInvoiceResponse: MessageTypeDefinition
    ListMacaroonIDsRequest: MessageTypeDefinition
    ListMacaroonIDsResponse: MessageTypeDefinition
    ListPaymentsRequest: MessageTypeDefinition
    ListPaymentsResponse: MessageTypeDefinition
    ListPeersRequest: MessageTypeDefinition
    ListPeersResponse: MessageTypeDefinition
    ListPermissionsRequest: MessageTypeDefinition
    ListPermissionsResponse: MessageTypeDefinition
    ListUnspentRequest: MessageTypeDefinition
    ListUnspentResponse: MessageTypeDefinition
    MPPRecord: MessageTypeDefinition
    MacaroonId: MessageTypeDefinition
    MacaroonPermission: MessageTypeDefinition
    MacaroonPermissionList: MessageTypeDefinition
    MultiChanBackup: MessageTypeDefinition
    NetworkInfo: MessageTypeDefinition
    NetworkInfoRequest: MessageTypeDefinition
    NewAddressRequest: MessageTypeDefinition
    NewAddressResponse: MessageTypeDefinition
    NodeAddress: MessageTypeDefinition
    NodeInfo: MessageTypeDefinition
    NodeInfoRequest: MessageTypeDefinition
    NodeMetricType: EnumTypeDefinition
    NodeMetricsRequest: MessageTypeDefinition
    NodeMetricsResponse: MessageTypeDefinition
    NodePair: MessageTypeDefinition
    NodeUpdate: MessageTypeDefinition
    Op: MessageTypeDefinition
    OpenChannelRequest: MessageTypeDefinition
    OpenStatusUpdate: MessageTypeDefinition
    OutPoint: MessageTypeDefinition
    PayReq: MessageTypeDefinition
    PayReqString: MessageTypeDefinition
    Payment: MessageTypeDefinition
    PaymentFailureReason: EnumTypeDefinition
    PaymentHash: MessageTypeDefinition
    Peer: MessageTypeDefinition
    PeerEvent: MessageTypeDefinition
    PeerEventSubscription: MessageTypeDefinition
    PendingChannelsRequest: MessageTypeDefinition
    PendingChannelsResponse: MessageTypeDefinition
    PendingHTLC: MessageTypeDefinition
    PendingUpdate: MessageTypeDefinition
    PolicyUpdateRequest: MessageTypeDefinition
    PolicyUpdateResponse: MessageTypeDefinition
    PsbtShim: MessageTypeDefinition
    QueryRoutesRequest: MessageTypeDefinition
    QueryRoutesResponse: MessageTypeDefinition
    ReadyForPsbtFunding: MessageTypeDefinition
    Resolution: MessageTypeDefinition
    ResolutionOutcome: EnumTypeDefinition
    ResolutionType: EnumTypeDefinition
    RestoreBackupResponse: MessageTypeDefinition
    RestoreChanBackupRequest: MessageTypeDefinition
    Route: MessageTypeDefinition
    RouteHint: MessageTypeDefinition
    RoutingPolicy: MessageTypeDefinition
    SendCoinsRequest: MessageTypeDefinition
    SendCoinsResponse: MessageTypeDefinition
    SendManyRequest: MessageTypeDefinition
    SendManyResponse: MessageTypeDefinition
    SendRequest: MessageTypeDefinition
    SendResponse: MessageTypeDefinition
    SendToRouteRequest: MessageTypeDefinition
    SignMessageRequest: MessageTypeDefinition
    SignMessageResponse: MessageTypeDefinition
    StopRequest: MessageTypeDefinition
    StopResponse: MessageTypeDefinition
    TimestampedError: MessageTypeDefinition
    Transaction: MessageTypeDefinition
    TransactionDetails: MessageTypeDefinition
    UnlockWalletRequest: MessageTypeDefinition
    UnlockWalletResponse: MessageTypeDefinition
    Utxo: MessageTypeDefinition
    VerifyChanBackupResponse: MessageTypeDefinition
    VerifyMessageRequest: MessageTypeDefinition
    VerifyMessageResponse: MessageTypeDefinition
    WalletAccountBalance: MessageTypeDefinition
    WalletBalanceRequest: MessageTypeDefinition
    WalletBalanceResponse: MessageTypeDefinition
    WalletUnlocker: SubtypeConstructor<typeof grpc.Client, _lnrpc_WalletUnlockerClient> & { service: _lnrpc_WalletUnlockerDefinition }
  }
}

