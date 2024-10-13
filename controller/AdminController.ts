import { Request, Response } from "express";
import AdminModel from "../model/AdminModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { sendEmail } from "../util/email";

export const Register = async (req: any, res: Response) => {
  try {
    const { firstName, lastName, email, verify, password } = req.body;
    const id = crypto.randomBytes(4).toString("hex");
    const create = await AdminModel.create({
      firstName,
      password,
      lastName,
      status: "Admin",
      email,
      verify,
      token: id,
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

    if (admin && (await bcrypt.compare(token, admin.token))) {
      if (admin.verify) {
        const token = jwt.sign({ status: admin.status }, "admin", {
          expiresIn: "1d",
        });

        return res.status(201).json({
          message: "welcome back",
          data: token,
          name: admin?.firstName,
          user: admin?.status,
          status: 201,
        });
      } else {
        return res.status(404).json({
          message: "please check your email to verify your account",
        });
      }
    } else {
      return res.status(404).json({
        message: "Invalid email or password",
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
        message: "admin verified successfully",
        data: verified,
      });
    } else {
      return res.status(404).json({
        message: "error finding admin",
        data: admin,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error verifying admin",
    });
  }
};
