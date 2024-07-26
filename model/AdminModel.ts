import { Document, Schema, model } from "mongoose";

interface iAdmin {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  verify: boolean;
  status: string;
}
interface iAdminData extends iAdmin, Document {}

const AdminModel = new Schema<iAdminData>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  token: { type: String },
  status: { type: String },
  verify: { type: Boolean },
});

export default model<iAdmin>("admins", AdminModel);
