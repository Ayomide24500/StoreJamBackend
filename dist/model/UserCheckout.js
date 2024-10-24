"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserCheckout = new mongoose_1.Schema({
    name: { type: String },
    address: { type: String },
    phone: { type: String },
});
exports.default = (0, mongoose_1.model)("checkout", UserCheckout);
