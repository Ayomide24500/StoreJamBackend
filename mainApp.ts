import { Application, Request, Response } from "express";
import create from "./router/AdminRouter";
import user from "./router/UserRouter";
import get from "./router/ShoppingRouter";
export const mainApp = (app: Application) => {
  try {
    app.use("/", create);
    app.use("/", user);
    app.use("/", get);
    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Entry to my shopping server is Successfull",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
