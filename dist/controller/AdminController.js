"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.Login = exports.Register = void 0;
const AdminModel_1 = __importDefault(require("../model/AdminModel"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, verify, lastName, email } = req.body;
        const id = crypto_1.default.randomBytes(4).toString("hex");
        const create = yield AdminModel_1.default.create({
            firstName,
            lastName,
            status: "Admin",
            email,
            verify,
            token: id,
        });
        return res.status(201).json({
            data: create,
            message: "data created",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating data",
        });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token, firstName } = req.body;
        const admin = yield AdminModel_1.default.findOne({
            email,
        });
        if (admin) {
            if (admin.token === token) {
                if (admin.verify) {
                    const token = jsonwebtoken_1.default.sign({ status: admin.status }, "admin", {
                        expiresIn: "1d",
                    });
                    return res.status(201).json({
                        message: "welcome back",
                        data: token,
                        name: admin === null || admin === void 0 ? void 0 : admin.firstName,
                        user: admin === null || admin === void 0 ? void 0 : admin.status,
                        status: 201,
                    });
                }
                else {
                    return res.status(404).json({
                        message: "please check your email to verify your account",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Error reading your admin token ID",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Error finding admin",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating admin",
            data: error.message,
        });
    }
});
exports.Login = Login;
const verifyAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const admin = yield AdminModel_1.default.findById(adminID);
        if (admin) {
            const verified = yield AdminModel_1.default.findByIdAndUpdate(adminID, { verify: true }, { new: true });
            return res.status(201).json({
                message: "admin verified successfully",
                data: verified,
            });
        }
        else {
            return res.status(404).json({
                message: "error finding admin",
                data: admin,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error verifying admin",
        });
    }
});
exports.verifyAdmin = verifyAdmin;
