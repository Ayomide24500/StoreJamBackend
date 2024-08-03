import { Request, Response } from "express";
import ShoppingModel from "../model/ShoppingtModel";
import cloudinary from "../util/Cloudinary";

export const createCart = async (req: any, res: Response) => {
  try {
    console.log("Uploaded file:", req.file);
    console.log("Request body:", req.body);
    const { productName, description, category, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { secure_url } = await cloudinary.uploader.upload(req.file.path);

    const create = await ShoppingModel.create({
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
  } catch (error: any) {
    console.log("error", error);

    return res.status(404).json({
      message: "Error creating data",
      error: error.message,
    });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const getAll = await ShoppingModel.find();

    return res.status(201).json({
      data: getAll,
      message: "all data",
    });
  } catch (error) {
    return res.status(200).json({
      message: "error getting error",
    });
  }
};
