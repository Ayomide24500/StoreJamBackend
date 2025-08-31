"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminModel = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String },
    status: { type: String, required: true, default: "Admin" },
    verify: { type: Boolean, default: false },
});
exports.default = (0, mongoose_1.model)("Admin", AdminModel);
