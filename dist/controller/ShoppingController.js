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
exports.getCart = exports.createCart = void 0;
const ShoppingtModel_1 = __importDefault(require("../model/ShoppingtModel"));
const Cloudinary_1 = __importDefault(require("../util/Cloudinary"));
const createCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Uploaded file:", req.file);
        console.log("Request body:", req.body);
        const { productName, description, category, price } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { secure_url } = yield Cloudinary_1.default.uploader.upload(req.file.path);
        const create = yield ShoppingtModel_1.default.create({
            productName,
            price,
            image: secure_url,
            category,
            description,
        });
        return res.status(201).json({
            data: create,
            message: "Data created successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error creating data",
            error: error.message,
        });
    }
});
exports.createCart = createCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAll = yield ShoppingtModel_1.default.find();
        return res.status(201).json({
            data: getAll,
            message: "all data",
        });
    }
    catch (error) {
        return res.status(200).json({
            message: "error getting error",
        });
    }
});
exports.getCart = getCart;
