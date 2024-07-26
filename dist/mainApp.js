"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const AdminRouter_1 = __importDefault(require("./router/AdminRouter"));
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const ShoppingRouter_1 = __importDefault(require("./router/ShoppingRouter"));
const mainApp = (app) => {
    try {
        app.use("/", AdminRouter_1.default);
        app.use("/", UserRouter_1.default);
        app.use("/", ShoppingRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Entry to my shopping server is Successfull",
                });
            }
            catch (error) {
                return res.status(404).json({
                    message: "Error",
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mainApp = mainApp;
