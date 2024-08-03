import { Request, Response } from "express";
import Order from "../model/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, cart } = req.body;

    const newOrder = new Order({
      user,
      cart,
    });

    const savedOrder = await newOrder.save();

    const notification = {
      id: savedOrder._id,
      user: savedOrder.user,
      cart: savedOrder.cart,
      createdAt: savedOrder.createdAt,
    };

    res.status(201).json({ success: true, order: savedOrder, notification });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};
