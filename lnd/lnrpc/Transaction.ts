// Original file: resources/rpc.proto

import type { Long } from '@grpc/proto-loader';

export interface Transaction {
  'txHash'?: (string);
  'amount'?: (number | string | Long);
  'numConfirmations'?: (number);
  'blockHash'?: (string);
  'blockHeight'?: (number);
  'timeStamp'?: (number | string | Long);
  'totalFees'?: (number | string | Long);
  'destAddresses'?: (string)[];
  'rawTxHex'?: (string);
  'label'?: (string);
}

export interface Transaction__Output {
  'txHash': (string);
  'amount': (string);
  'numConfirmations': (number);
  'blockHash': (string);
  'blockHeight': (number);
  'timeStamp': (string);
  'totalFees': (string);
  'destAddresses': (string)[];
  'rawTxHex': (string);
  'label': (string);
}