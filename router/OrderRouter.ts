import { Router } from "express";
import { createOrder, getOrders } from "../controller/OrderController";

const router = Router();

router.post("/checkout", createOrder);
router.get("/orders", getOrders);

export default router;
