import { Request, Response } from "express";
import AdminModel from "../model/AdminModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { sendEmail } from "../util/email";

export const Register = async (req: any, res: Response) => {
  try {
    const { firstName, lastName, email, verify } = req.body;
    const id = crypto.randomBytes(4).toString("hex"); // Generate a token
    const create = await AdminModel.create({
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
  } catch (error: any) {
    return res.status(404).json({
      message: "error creating data",
      error: error.message,
    });
  }
};

export const Login = async (req: any, res: Response): Promise<Response> => {
  try {
    const { email, token } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (admin) {
      if (admin.verify) {
        if (admin.token === token) {
          const authToken = jwt.sign(
            { id: admin._id, status: admin.status },
            "jeans",
            { expiresIn: "1h" } // Token expiration
          );

          return res.status(200).json({
            message: "welcome back",
            data: authToken,
            name: admin.firstName,
            user: admin.status,
          });
        } else {
          return res.status(401).json({
            message: "Invalid token. Please check your token and try again.",
          });
        }
      } else {
        return res.status(403).json({
          message: "Please check your email to verify your account.",
        });
      }
    } else {
      return res.status(404).json({
        message: "Admin not found. Please check your email and try again.",
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: "Error logging in",
      data: error.message,
    });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { adminID } = req.params;

    const admin = await AdminModel.findById(adminID);

    if (admin) {
      const verified = await AdminModel.findByIdAndUpdate(
        adminID,
        { verify: true },
        { new: true }
      );

      return res.status(201).json({
        message: "Admin verified successfully",
        data: verified,
      });
    } else {
      return res.status(404).json({
        message: "Error finding admin",
        data: admin,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error verifying admin",
    });
  }
};
