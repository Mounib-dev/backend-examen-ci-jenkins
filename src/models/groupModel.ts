import mongoose, { Document, Schema, Types } from "mongoose";

export interface IGroup extends Document<Types.ObjectId> {
  name: string;
  members: mongoose.Schema.Types.ObjectId[];
  invitations: mongoose.Schema.Types.ObjectId[];
}

const groupSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invitations: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Group = mongoose.model<IGroup>("Groups", groupSchema);
