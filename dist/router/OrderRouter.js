"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controller/OrderController");
const router = (0, express_1.Router)();
router.post("/checkout", OrderController_1.createOrder);
router.get("/orders", OrderController_1.getOrders);
exports.default = router;
