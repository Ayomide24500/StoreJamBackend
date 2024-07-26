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
exports.getUser = exports.Register = void 0;
const UserCheckout_1 = __importDefault(require("../model/UserCheckout"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, phone } = req.body;
        const create = yield UserCheckout_1.default.create({
            name,
            address,
            phone,
        });
        return res.status(201).json({
            data: create,
            message: "user created",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating data",
        });
    }
});
exports.Register = Register;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const create = yield UserCheckout_1.default.find();
        return res.status(201).json({
            data: create,
            message: "user gotten",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error getting data",
        });
    }
});
exports.getUser = getUser;
