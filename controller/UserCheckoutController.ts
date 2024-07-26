import { Response, Request } from "express";
import UserCheckout from "../model/UserCheckout";

export const Register = async (req: any, res: Response) => {
  try {
    const { name, address, phone } = req.body;
    const create = await UserCheckout.create({
      name,
      address,
      phone,
    });
    return res.status(201).json({
      data: create,
      message: "user created",
    });
  } catch (error) {
    return res.status(404).json({
      message: "error creating data",
    });
  }
};

export const getUser = async (req: any, res: Response) => {
  try {
    const create = await UserCheckout.find();
    return res.status(201).json({
      data: create,
      message: "user gotten",
    });
  } catch (error) {
    return res.status(404).json({
      message: "error getting data",
    });
  }
};
