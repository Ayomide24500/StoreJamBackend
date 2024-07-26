"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = require("../util/multer");
const multer_2 = __importDefault(require("multer"));
const ShoppingController_1 = require("../controller/ShoppingController");
const router = (0, express_1.Router)();
router.route("/single").post((req, res, next) => {
    (0, multer_1.uploadSingle)(req, res, (err) => {
        if (err instanceof multer_2.default.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({ message: "File too large" });
            }
        }
        else if (err) {
            return res.status(500).json({ message: err.message });
        }
        next();
    });
}, ShoppingController_1.createCart);
router.route("/get").get(ShoppingController_1.getCart);
exports.default = router;
