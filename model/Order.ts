import { Schema, model, Document } from "mongoose";

interface IOrder extends Document {
  user: {
    name: string;
    address: string;
    phone: string;
  };
  cart: {
    productId: string;
    productName: string;
    quantity: number;
  }[];
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  user: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  cart: [
    {
      productId: { type: String, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
