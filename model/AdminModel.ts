import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IAdmin {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  verify: boolean;
  status: string;
}

interface IAdminDocument extends IAdmin, Document {}

const AdminModel = new Schema<IAdminDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String },
  status: { type: String, required: true, default: "Admin" },
  verify: { type: Boolean, default: false },
});

export default model<IAdminDocument>("Admin", AdminModel);
