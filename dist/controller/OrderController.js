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
exports.getOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../model/Order"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, cart } = req.body;
        const newOrder = new Order_1.default({
            user,
            cart,
        });
        const savedOrder = yield newOrder.save();
        const notification = {
            id: savedOrder._id,
            user: savedOrder.user,
            cart: savedOrder.cart,
            createdAt: savedOrder.createdAt,
        };
        res.status(201).json({ success: true, order: savedOrder, notification });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});
exports.getOrders = getOrders;
