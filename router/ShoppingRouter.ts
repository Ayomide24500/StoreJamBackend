import { Router } from "express";
import { uploadSingle } from "../util/multer";
import multer from "multer";
import { createCart, getCart } from "../controller/ShoppingController";

const router: Router = Router();

router.route("/single").post((req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large" });
      }
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    next();
  });
}, createCart);

router.route("/get").get(getCart);

export default router;
