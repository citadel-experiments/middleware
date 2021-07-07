// Original file: resources/rpc.proto

import type { Amount as _lnrpc_Amount, Amount__Output as _lnrpc_Amount__Output } from '../lnrpc/Amount';
import type { Long } from '@grpc/proto-loader';

export interface ChannelBalanceResponse {
  'balance'?: (number | string | Long);
  'pendingOpenBalance'?: (number | string | Long);
  'localBalance'?: (_lnrpc_Amount | null);
  'remoteBalance'?: (_lnrpc_Amount | null);
  'unsettledLocalBalance'?: (_lnrpc_Amount | null);
  'unsettledRemoteBalance'?: (_lnrpc_Amount | null);
  'pendingOpenLocalBalance'?: (_lnrpc_Amount | null);
  'pendingOpenRemoteBalance'?: (_lnrpc_Amount | null);
}

export interface ChannelBalanceResponse__Output {
  'balance'?: (Long);
  'pendingOpenBalance'?: (Long);
  'localBalance'?: (_lnrpc_Amount__Output);
  'remoteBalance'?: (_lnrpc_Amount__Output);
  'unsettledLocalBalance'?: (_lnrpc_Amount__Output);
  'unsettledRemoteBalance'?: (_lnrpc_Amount__Output);
  'pendingOpenLocalBalance'?: (_lnrpc_Amount__Output);
  'pendingOpenRemoteBalance'?: (_lnrpc_Amount__Output);
}
