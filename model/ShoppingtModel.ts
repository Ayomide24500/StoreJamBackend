import { Document, Schema, model } from "mongoose";

interface iShop {
  productName: string;
  image: string;
  rating: number;
  price: string;
  description: string;
  category: string;
  sold: boolean;
}
interface iShopData extends iShop, Document {}

const ShopSchema = new Schema<iShopData>({
  productName: { type: String },
  price: { type: String },
  category: { type: String },
  image: { type: String, unique: true },
  description: { type: String },
  sold: { type: Boolean },
});

export default model<iShop>("shoppings", ShopSchema);
