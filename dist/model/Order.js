"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
