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
// import { sendEmail } from "../util/email";
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, verify } = req.body;
        const id = crypto_1.default.randomBytes(4).toString("hex"); // Generate a token
        const create = yield AdminModel_1.default.create({
            firstName,
            lastName,
            status: "Admin",
            email,
            verify,
            token: id, // Store the token
        });
        // sendEmail(create);
        return res.status(201).json({
            data: create,
            message: "data created",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating data",
            error: error.message,
        });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const admin = yield AdminModel_1.default.findOne({ email });
        if (admin) {
            if (admin.verify) {
                if (admin.token === token) {
                    const authToken = jsonwebtoken_1.default.sign({ id: admin._id, status: admin.status }, "jeans", { expiresIn: "1h" } // Token expiration
                    );
                    return res.status(200).json({
                        message: "welcome back",
                        data: authToken,
                        name: admin.firstName,
                        user: admin.status,
                    });
                }
                else {
                    return res.status(401).json({
                        message: "Invalid token. Please check your token and try again.",
                    });
                }
            }
            else {
                return res.status(403).json({
                    message: "Please check your email to verify your account.",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "Admin not found. Please check your email and try again.",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Error logging in",
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
                message: "Admin verified successfully",
                data: verified,
            });
        }
        else {
            return res.status(404).json({
                message: "Error finding admin",
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
