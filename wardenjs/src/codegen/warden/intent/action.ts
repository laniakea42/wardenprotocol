import { Timestamp } from "../../google/protobuf/timestamp";
import { Any, AnyAmino, AnySDKType } from "../../google/protobuf/any";
import { BinaryReader, BinaryWriter } from "../../binary";
import { toTimestamp, fromTimestamp } from "../../helpers";
/** Current status of an action. */
export enum ActionStatus {
  /** ACTION_STATUS_UNSPECIFIED - Unspecified status. */
  ACTION_STATUS_UNSPECIFIED = 0,
  /** ACTION_STATUS_PENDING - Action is pending approval. This is the initial status. */
  ACTION_STATUS_PENDING = 1,
  /** ACTION_STATUS_COMPLETED - Intent has been satified, action has been executed. */
  ACTION_STATUS_COMPLETED = 2,
  /** ACTION_STATUS_REVOKED - Action has been revoked by its creator. */
  ACTION_STATUS_REVOKED = 3,
  /** ACTION_STATUS_TIMEOUT - Action has been rejected since Btl is expired */
  ACTION_STATUS_TIMEOUT = 4,
  UNRECOGNIZED = -1,
}
export const ActionStatusSDKType = ActionStatus;
export const ActionStatusAmino = ActionStatus;
export function actionStatusFromJSON(object: any): ActionStatus {
  switch (object) {
    case 0:
    case "ACTION_STATUS_UNSPECIFIED":
      return ActionStatus.ACTION_STATUS_UNSPECIFIED;
    case 1:
    case "ACTION_STATUS_PENDING":
      return ActionStatus.ACTION_STATUS_PENDING;
    case 2:
    case "ACTION_STATUS_COMPLETED":
      return ActionStatus.ACTION_STATUS_COMPLETED;
    case 3:
    case "ACTION_STATUS_REVOKED":
      return ActionStatus.ACTION_STATUS_REVOKED;
    case 4:
    case "ACTION_STATUS_TIMEOUT":
      return ActionStatus.ACTION_STATUS_TIMEOUT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionStatus.UNRECOGNIZED;
  }
}
export function actionStatusToJSON(object: ActionStatus): string {
  switch (object) {
    case ActionStatus.ACTION_STATUS_UNSPECIFIED:
      return "ACTION_STATUS_UNSPECIFIED";
    case ActionStatus.ACTION_STATUS_PENDING:
      return "ACTION_STATUS_PENDING";
    case ActionStatus.ACTION_STATUS_COMPLETED:
      return "ACTION_STATUS_COMPLETED";
    case ActionStatus.ACTION_STATUS_REVOKED:
      return "ACTION_STATUS_REVOKED";
    case ActionStatus.ACTION_STATUS_TIMEOUT:
      return "ACTION_STATUS_TIMEOUT";
    case ActionStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Approver {
  /** address is the address of the approver */
  address: string;
  /** approved_at is a timestamp specifying when the approver approved an action */
  approvedAt: Date;
}
export interface ApproverProtoMsg {
  typeUrl: "/warden.intent.Approver";
  value: Uint8Array;
}
export interface ApproverAmino {
  /** address is the address of the approver */
  address?: string;
  /** approved_at is a timestamp specifying when the approver approved an action */
  approved_at: string;
}
export interface ApproverAminoMsg {
  type: "/warden.intent.Approver";
  value: ApproverAmino;
}
export interface ApproverSDKType {
  address: string;
  approved_at: Date;
}
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface Action {
  id: bigint;
  approvers: Approver[];
  status: ActionStatus;
  /**
   * Optional intent id that must be satisfied by the approvers.
   * If not specified, it's up to the creator of the action to decide what to
   * apply.
   */
  intentId: bigint;
  /**
   * Original message that started the action, it will be executed when the
   * intent is satisfied.
   */
  msg?: Any;
  /** Result of the action, it will be set when the action is completed. */
  result?: Any;
  creator: string;
  /**
   * BTL (blocks to live) is the block height up until this action can be
   * approved or rejected.
   */
  btl: bigint;
  /** created_at is a timestamp specifying when the action was created */
  createdAt: Date;
  /** updated_at is a timestamp specifying when the action's status was updated */
  updatedAt: Date;
}
export interface ActionProtoMsg {
  typeUrl: "/warden.intent.Action";
  value: Uint8Array;
}
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface ActionAmino {
  id?: string;
  approvers?: ApproverAmino[];
  status?: ActionStatus;
  /**
   * Optional intent id that must be satisfied by the approvers.
   * If not specified, it's up to the creator of the action to decide what to
   * apply.
   */
  intent_id?: string;
  /**
   * Original message that started the action, it will be executed when the
   * intent is satisfied.
   */
  msg?: AnyAmino;
  /** Result of the action, it will be set when the action is completed. */
  result?: AnyAmino;
  creator?: string;
  /**
   * BTL (blocks to live) is the block height up until this action can be
   * approved or rejected.
   */
  btl?: string;
  /** created_at is a timestamp specifying when the action was created */
  created_at: string;
  /** updated_at is a timestamp specifying when the action's status was updated */
  updated_at: string;
}
export interface ActionAminoMsg {
  type: "/warden.intent.Action";
  value: ActionAmino;
}
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface ActionSDKType {
  id: bigint;
  approvers: ApproverSDKType[];
  status: ActionStatus;
  intent_id: bigint;
  msg?: AnySDKType;
  result?: AnySDKType;
  creator: string;
  btl: bigint;
  created_at: Date;
  updated_at: Date;
}
/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreated {
  action?: Action;
}
export interface MsgActionCreatedProtoMsg {
  typeUrl: "/warden.intent.MsgActionCreated";
  value: Uint8Array;
}
/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreatedAmino {
  action?: ActionAmino;
}
export interface MsgActionCreatedAminoMsg {
  type: "/warden.intent.MsgActionCreated";
  value: MsgActionCreatedAmino;
}
/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreatedSDKType {
  action?: ActionSDKType;
}
function createBaseApprover(): Approver {
  return {
    address: "",
    approvedAt: new Date()
  };
}
export const Approver = {
  typeUrl: "/warden.intent.Approver",
  encode(message: Approver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.approvedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.approvedAt), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Approver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApprover();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.approvedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Approver>): Approver {
    const message = createBaseApprover();
    message.address = object.address ?? "";
    message.approvedAt = object.approvedAt ?? undefined;
    return message;
  },
  fromAmino(object: ApproverAmino): Approver {
    const message = createBaseApprover();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.approved_at !== undefined && object.approved_at !== null) {
      message.approvedAt = fromTimestamp(Timestamp.fromAmino(object.approved_at));
    }
    return message;
  },
  toAmino(message: Approver): ApproverAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.approved_at = message.approvedAt ? Timestamp.toAmino(toTimestamp(message.approvedAt)) : new Date();
    return obj;
  },
  fromAminoMsg(object: ApproverAminoMsg): Approver {
    return Approver.fromAmino(object.value);
  },
  fromProtoMsg(message: ApproverProtoMsg): Approver {
    return Approver.decode(message.value);
  },
  toProto(message: Approver): Uint8Array {
    return Approver.encode(message).finish();
  },
  toProtoMsg(message: Approver): ApproverProtoMsg {
    return {
      typeUrl: "/warden.intent.Approver",
      value: Approver.encode(message).finish()
    };
  }
};
function createBaseAction(): Action {
  return {
    id: BigInt(0),
    approvers: [],
    status: 0,
    intentId: BigInt(0),
    msg: undefined,
    result: undefined,
    creator: "",
    btl: BigInt(0),
    createdAt: new Date(),
    updatedAt: new Date()
  };
}
export const Action = {
  typeUrl: "/warden.intent.Action",
  encode(message: Action, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.approvers) {
      Approver.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.intentId !== BigInt(0)) {
      writer.uint32(32).uint64(message.intentId);
    }
    if (message.msg !== undefined) {
      Any.encode(message.msg, writer.uint32(42).fork()).ldelim();
    }
    if (message.result !== undefined) {
      Any.encode(message.result, writer.uint32(50).fork()).ldelim();
    }
    if (message.creator !== "") {
      writer.uint32(58).string(message.creator);
    }
    if (message.btl !== BigInt(0)) {
      writer.uint32(64).uint64(message.btl);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Action {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.approvers.push(Approver.decode(reader, reader.uint32()));
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 4:
          message.intentId = reader.uint64();
          break;
        case 5:
          message.msg = Any.decode(reader, reader.uint32());
          break;
        case 6:
          message.result = Any.decode(reader, reader.uint32());
          break;
        case 7:
          message.creator = reader.string();
          break;
        case 8:
          message.btl = reader.uint64();
          break;
        case 9:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Action>): Action {
    const message = createBaseAction();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.approvers = object.approvers?.map(e => Approver.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.intentId = object.intentId !== undefined && object.intentId !== null ? BigInt(object.intentId.toString()) : BigInt(0);
    message.msg = object.msg !== undefined && object.msg !== null ? Any.fromPartial(object.msg) : undefined;
    message.result = object.result !== undefined && object.result !== null ? Any.fromPartial(object.result) : undefined;
    message.creator = object.creator ?? "";
    message.btl = object.btl !== undefined && object.btl !== null ? BigInt(object.btl.toString()) : BigInt(0);
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
  fromAmino(object: ActionAmino): Action {
    const message = createBaseAction();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    message.approvers = object.approvers?.map(e => Approver.fromAmino(e)) || [];
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.intent_id !== undefined && object.intent_id !== null) {
      message.intentId = BigInt(object.intent_id);
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = Any.fromAmino(object.msg);
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = Any.fromAmino(object.result);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.btl !== undefined && object.btl !== null) {
      message.btl = BigInt(object.btl);
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.createdAt = fromTimestamp(Timestamp.fromAmino(object.created_at));
    }
    if (object.updated_at !== undefined && object.updated_at !== null) {
      message.updatedAt = fromTimestamp(Timestamp.fromAmino(object.updated_at));
    }
    return message;
  },
  toAmino(message: Action): ActionAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    if (message.approvers) {
      obj.approvers = message.approvers.map(e => e ? Approver.toAmino(e) : undefined);
    } else {
      obj.approvers = message.approvers;
    }
    obj.status = message.status === 0 ? undefined : message.status;
    obj.intent_id = message.intentId !== BigInt(0) ? message.intentId.toString() : undefined;
    obj.msg = message.msg ? Any.toAmino(message.msg) : undefined;
    obj.result = message.result ? Any.toAmino(message.result) : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.btl = message.btl !== BigInt(0) ? message.btl.toString() : undefined;
    obj.created_at = message.createdAt ? Timestamp.toAmino(toTimestamp(message.createdAt)) : new Date();
    obj.updated_at = message.updatedAt ? Timestamp.toAmino(toTimestamp(message.updatedAt)) : new Date();
    return obj;
  },
  fromAminoMsg(object: ActionAminoMsg): Action {
    return Action.fromAmino(object.value);
  },
  fromProtoMsg(message: ActionProtoMsg): Action {
    return Action.decode(message.value);
  },
  toProto(message: Action): Uint8Array {
    return Action.encode(message).finish();
  },
  toProtoMsg(message: Action): ActionProtoMsg {
    return {
      typeUrl: "/warden.intent.Action",
      value: Action.encode(message).finish()
    };
  }
};
function createBaseMsgActionCreated(): MsgActionCreated {
  return {
    action: undefined
  };
}
export const MsgActionCreated = {
  typeUrl: "/warden.intent.MsgActionCreated",
  encode(message: MsgActionCreated, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.action !== undefined) {
      Action.encode(message.action, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgActionCreated {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgActionCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = Action.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgActionCreated>): MsgActionCreated {
    const message = createBaseMsgActionCreated();
    message.action = object.action !== undefined && object.action !== null ? Action.fromPartial(object.action) : undefined;
    return message;
  },
  fromAmino(object: MsgActionCreatedAmino): MsgActionCreated {
    const message = createBaseMsgActionCreated();
    if (object.action !== undefined && object.action !== null) {
      message.action = Action.fromAmino(object.action);
    }
    return message;
  },
  toAmino(message: MsgActionCreated): MsgActionCreatedAmino {
    const obj: any = {};
    obj.action = message.action ? Action.toAmino(message.action) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgActionCreatedAminoMsg): MsgActionCreated {
    return MsgActionCreated.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgActionCreatedProtoMsg): MsgActionCreated {
    return MsgActionCreated.decode(message.value);
  },
  toProto(message: MsgActionCreated): Uint8Array {
    return MsgActionCreated.encode(message).finish();
  },
  toProtoMsg(message: MsgActionCreated): MsgActionCreatedProtoMsg {
    return {
      typeUrl: "/warden.intent.MsgActionCreated",
      value: MsgActionCreated.encode(message).finish()
    };
  }
};