import { Document, Schema, model } from "mongoose";

interface iUserCheck {
  name: string;
  address: string;
  phone: string;
}
interface iUserCheckData extends iUserCheck, Document {}

const UserCheckout = new Schema<iUserCheckData>({
  name: { type: String },
  address: { type: String },
  phone: { type: String },
});

export default model<iUserCheck>("checkout", UserCheckout);
