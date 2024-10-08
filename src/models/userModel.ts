import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document<Types.ObjectId> {
  firstname: string;
  lastname: string;
  birthDate: Date;
  email: string;
  password: string;
  role: "admin" | "user";
  group?: Types.ObjectId;
}

const userSchema: Schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  const thisObj = this as IUser;
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(thisObj.password, salt);
    } catch (error: any) {
      return next(error);
    }
  }
  next();
});

export const User = mongoose.model<IUser>("Users", userSchema);
