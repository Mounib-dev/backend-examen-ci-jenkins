import mongoose, { Document, Schema, Types } from "mongoose";

export interface IConfig extends Document<Types.ObjectId> {
  usersNumber: string;
  groupsNumber: string;
  lastMin: boolean;
  lastMax: boolean;
}

const configSchema: Schema = new mongoose.Schema({
  usersNumber: {
    type: String,
    required: true,
  },
  groupsNumber: {
    type: String,
    required: true,
  },
  lastMin: {
    type: Boolean,
    default: false,
    required: true,
  },
  lastMax: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const Config = mongoose.model<IConfig>("Config", configSchema);
