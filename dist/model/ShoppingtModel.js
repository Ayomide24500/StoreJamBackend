"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShopSchema = new mongoose_1.Schema({
    productName: { type: String },
    price: { type: String },
    category: { type: String },
    image: { type: String, unique: true },
    description: { type: String },
    sold: { type: Boolean },
});
exports.default = (0, mongoose_1.model)("shoppings", ShopSchema);
