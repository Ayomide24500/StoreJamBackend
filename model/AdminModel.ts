import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IAdmin {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  verify: boolean;
  status: string;
  password: string;
}

interface IAdminDocument extends IAdmin, Document {}

const AdminModel = new Schema<IAdminDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String },
  status: { type: String, required: true, default: "Admin" },
  password: { type: String, required: true },
  verify: { type: Boolean, default: false },
});

AdminModel.pre("save", async function (next) {
  const admin = this as IAdminDocument;
  if (!admin.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  next();
});

export default model<IAdminDocument>("Admin", AdminModel);
