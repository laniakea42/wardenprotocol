import { BinaryReader, BinaryWriter } from "../../../binary";
export interface Keychain {
  address: string;
  creator: string;
  description: string;
  admins: string[];
  parties: string[];
  adminIntentId: bigint;
  fees?: KeychainFees;
  isActive: boolean;
}
export interface KeychainProtoMsg {
  typeUrl: "/warden.warden.v1beta1.Keychain";
  value: Uint8Array;
}
export interface KeychainAmino {
  address?: string;
  creator?: string;
  description?: string;
  admins?: string[];
  parties?: string[];
  admin_intent_id?: string;
  fees?: KeychainFeesAmino;
  is_active?: boolean;
}
export interface KeychainAminoMsg {
  type: "/warden.warden.v1beta1.Keychain";
  value: KeychainAmino;
}
export interface KeychainSDKType {
  address: string;
  creator: string;
  description: string;
  admins: string[];
  parties: string[];
  admin_intent_id: bigint;
  fees?: KeychainFeesSDKType;
  is_active: boolean;
}
export interface KeychainFees {
  keyReq: bigint;
  sigReq: bigint;
}
export interface KeychainFeesProtoMsg {
  typeUrl: "/warden.warden.v1beta1.KeychainFees";
  value: Uint8Array;
}
export interface KeychainFeesAmino {
  key_req?: string;
  sig_req?: string;
}
export interface KeychainFeesAminoMsg {
  type: "/warden.warden.v1beta1.KeychainFees";
  value: KeychainFeesAmino;
}
export interface KeychainFeesSDKType {
  key_req: bigint;
  sig_req: bigint;
}
function createBaseKeychain(): Keychain {
  return {
    address: "",
    creator: "",
    description: "",
    admins: [],
    parties: [],
    adminIntentId: BigInt(0),
    fees: undefined,
    isActive: false
  };
}
export const Keychain = {
  typeUrl: "/warden.warden.v1beta1.Keychain",
  encode(message: Keychain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    for (const v of message.admins) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.parties) {
      writer.uint32(42).string(v!);
    }
    if (message.adminIntentId !== BigInt(0)) {
      writer.uint32(48).uint64(message.adminIntentId);
    }
    if (message.fees !== undefined) {
      KeychainFees.encode(message.fees, writer.uint32(58).fork()).ldelim();
    }
    if (message.isActive === true) {
      writer.uint32(64).bool(message.isActive);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Keychain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeychain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.admins.push(reader.string());
          break;
        case 5:
          message.parties.push(reader.string());
          break;
        case 6:
          message.adminIntentId = reader.uint64();
          break;
        case 7:
          message.fees = KeychainFees.decode(reader, reader.uint32());
          break;
        case 8:
          message.isActive = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Keychain>): Keychain {
    const message = createBaseKeychain();
    message.address = object.address ?? "";
    message.creator = object.creator ?? "";
    message.description = object.description ?? "";
    message.admins = object.admins?.map(e => e) || [];
    message.parties = object.parties?.map(e => e) || [];
    message.adminIntentId = object.adminIntentId !== undefined && object.adminIntentId !== null ? BigInt(object.adminIntentId.toString()) : BigInt(0);
    message.fees = object.fees !== undefined && object.fees !== null ? KeychainFees.fromPartial(object.fees) : undefined;
    message.isActive = object.isActive ?? false;
    return message;
  },
  fromAmino(object: KeychainAmino): Keychain {
    const message = createBaseKeychain();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.admins = object.admins?.map(e => e) || [];
    message.parties = object.parties?.map(e => e) || [];
    if (object.admin_intent_id !== undefined && object.admin_intent_id !== null) {
      message.adminIntentId = BigInt(object.admin_intent_id);
    }
    if (object.fees !== undefined && object.fees !== null) {
      message.fees = KeychainFees.fromAmino(object.fees);
    }
    if (object.is_active !== undefined && object.is_active !== null) {
      message.isActive = object.is_active;
    }
    return message;
  },
  toAmino(message: Keychain): KeychainAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = message.admins;
    }
    if (message.parties) {
      obj.parties = message.parties.map(e => e);
    } else {
      obj.parties = message.parties;
    }
    obj.admin_intent_id = message.adminIntentId !== BigInt(0) ? message.adminIntentId.toString() : undefined;
    obj.fees = message.fees ? KeychainFees.toAmino(message.fees) : undefined;
    obj.is_active = message.isActive === false ? undefined : message.isActive;
    return obj;
  },
  fromAminoMsg(object: KeychainAminoMsg): Keychain {
    return Keychain.fromAmino(object.value);
  },
  fromProtoMsg(message: KeychainProtoMsg): Keychain {
    return Keychain.decode(message.value);
  },
  toProto(message: Keychain): Uint8Array {
    return Keychain.encode(message).finish();
  },
  toProtoMsg(message: Keychain): KeychainProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.Keychain",
      value: Keychain.encode(message).finish()
    };
  }
};
function createBaseKeychainFees(): KeychainFees {
  return {
    keyReq: BigInt(0),
    sigReq: BigInt(0)
  };
}
export const KeychainFees = {
  typeUrl: "/warden.warden.v1beta1.KeychainFees",
  encode(message: KeychainFees, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.keyReq !== BigInt(0)) {
      writer.uint32(8).int64(message.keyReq);
    }
    if (message.sigReq !== BigInt(0)) {
      writer.uint32(16).int64(message.sigReq);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): KeychainFees {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeychainFees();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyReq = reader.int64();
          break;
        case 2:
          message.sigReq = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<KeychainFees>): KeychainFees {
    const message = createBaseKeychainFees();
    message.keyReq = object.keyReq !== undefined && object.keyReq !== null ? BigInt(object.keyReq.toString()) : BigInt(0);
    message.sigReq = object.sigReq !== undefined && object.sigReq !== null ? BigInt(object.sigReq.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: KeychainFeesAmino): KeychainFees {
    const message = createBaseKeychainFees();
    if (object.key_req !== undefined && object.key_req !== null) {
      message.keyReq = BigInt(object.key_req);
    }
    if (object.sig_req !== undefined && object.sig_req !== null) {
      message.sigReq = BigInt(object.sig_req);
    }
    return message;
  },
  toAmino(message: KeychainFees): KeychainFeesAmino {
    const obj: any = {};
    obj.key_req = message.keyReq !== BigInt(0) ? message.keyReq.toString() : undefined;
    obj.sig_req = message.sigReq !== BigInt(0) ? message.sigReq.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: KeychainFeesAminoMsg): KeychainFees {
    return KeychainFees.fromAmino(object.value);
  },
  fromProtoMsg(message: KeychainFeesProtoMsg): KeychainFees {
    return KeychainFees.decode(message.value);
  },
  toProto(message: KeychainFees): Uint8Array {
    return KeychainFees.encode(message).finish();
  },
  toProtoMsg(message: KeychainFees): KeychainFeesProtoMsg {
    return {
      typeUrl: "/warden.warden.v1beta1.KeychainFees",
      value: KeychainFees.encode(message).finish()
    };
  }
};