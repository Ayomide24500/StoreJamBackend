"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminModel = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    token: { type: String },
    status: { type: String },
    verify: { type: Boolean, default: false },
});
exports.default = (0, mongoose_1.model)("admins", AdminModel);
