/* eslint-disable */
import Long from "long";
// Manually patched with the extension
import _m0 from "protobufjs/minimal.js";

export const protobufPackage = "lnrpc";

export enum WalletState {
  NON_EXISTING = 0,
  LOCKED = 1,
  UNLOCKED = 2,
  RPC_ACTIVE = 3,
  WAITING_TO_START = 255,
  UNRECOGNIZED = -1,
}

export function walletStateFromJSON(object: any): WalletState {
  switch (object) {
    case 0:
    case "NON_EXISTING":
      return WalletState.NON_EXISTING;
    case 1:
    case "LOCKED":
      return WalletState.LOCKED;
    case 2:
    case "UNLOCKED":
      return WalletState.UNLOCKED;
    case 3:
    case "RPC_ACTIVE":
      return WalletState.RPC_ACTIVE;
    case 255:
    case "WAITING_TO_START":
      return WalletState.WAITING_TO_START;
    case -1:
    case "UNRECOGNIZED":
    default:
      return WalletState.UNRECOGNIZED;
  }
}

export function walletStateToJSON(object: WalletState): string {
  switch (object) {
    case WalletState.NON_EXISTING:
      return "NON_EXISTING";
    case WalletState.LOCKED:
      return "LOCKED";
    case WalletState.UNLOCKED:
      return "UNLOCKED";
    case WalletState.RPC_ACTIVE:
      return "RPC_ACTIVE";
    case WalletState.WAITING_TO_START:
      return "WAITING_TO_START";
    default:
      return "UNKNOWN";
  }
}

export interface SubscribeStateRequest {}

export interface SubscribeStateResponse {
  state: WalletState;
}

export interface GetStateRequest {}

export interface GetStateResponse {
  state: WalletState;
}

const baseSubscribeStateRequest: object = {};

export const SubscribeStateRequest = {
  encode(
    _: SubscribeStateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSubscribeStateRequest } as SubscribeStateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): SubscribeStateRequest {
    const message = { ...baseSubscribeStateRequest } as SubscribeStateRequest;
    return message;
  },

  toJSON(_: SubscribeStateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<SubscribeStateRequest>): SubscribeStateRequest {
    const message = { ...baseSubscribeStateRequest } as SubscribeStateRequest;
    return message;
  },
};

const baseSubscribeStateResponse: object = { state: 0 };

export const SubscribeStateResponse = {
  encode(
    message: SubscribeStateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SubscribeStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSubscribeStateResponse } as SubscribeStateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubscribeStateResponse {
    const message = { ...baseSubscribeStateResponse } as SubscribeStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = walletStateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    return message;
  },

  toJSON(message: SubscribeStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined &&
      (obj.state = walletStateToJSON(message.state));
    return obj;
  },

  fromPartial(
    object: DeepPartial<SubscribeStateResponse>
  ): SubscribeStateResponse {
    const message = { ...baseSubscribeStateResponse } as SubscribeStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    return message;
  },
};

const baseGetStateRequest: object = {};

export const GetStateRequest = {
  encode(
    _: GetStateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetStateRequest } as GetStateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetStateRequest {
    const message = { ...baseGetStateRequest } as GetStateRequest;
    return message;
  },

  toJSON(_: GetStateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<GetStateRequest>): GetStateRequest {
    const message = { ...baseGetStateRequest } as GetStateRequest;
    return message;
  },
};

const baseGetStateResponse: object = { state: 0 };

export const GetStateResponse = {
  encode(
    message: GetStateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetStateResponse } as GetStateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetStateResponse {
    const message = { ...baseGetStateResponse } as GetStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = walletStateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    return message;
  },

  toJSON(message: GetStateResponse): unknown {
    const obj: any = {};
    message.state !== undefined &&
      (obj.state = walletStateToJSON(message.state));
    return obj;
  },

  fromPartial(object: DeepPartial<GetStateResponse>): GetStateResponse {
    const message = { ...baseGetStateResponse } as GetStateResponse;
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    return message;
  },
};

/**
 * State service is a always running service that exposes the current state of
 * the wallet and RPC server.
 */
export const StateDefinition = {
  name: "State",
  fullName: "lnrpc.State",
  methods: {
    /**
     * SubscribeState subscribes to the state of the wallet. The current wallet
     * state will always be delivered immediately.
     */
    subscribeState: {
      name: "SubscribeState",
      requestType: SubscribeStateRequest,
      requestStream: false,
      responseType: SubscribeStateResponse,
      responseStream: true,
      options: {},
    },
    /**
     * GetState returns the current wallet state without streaming further
     * changes.
     */
    getState: {
      name: "GetState",
      requestType: GetStateRequest,
      requestStream: false,
      responseType: GetStateResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}