"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../controller/AdminController");
const router = (0, express_1.Router)();
router.route("/register").post(AdminController_1.Register);
router.route("/verify/:adminID").patch(AdminController_1.verifyAdmin);
router.route("/login").post(AdminController_1.Login);
exports.default = router;
