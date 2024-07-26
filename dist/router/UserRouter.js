"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCheckoutController_1 = require("../controller/UserCheckoutController");
const router = (0, express_1.Router)();
router.route("/register-user").post(UserCheckoutController_1.Register);
router.route("/get-user").get(UserCheckoutController_1.getUser);
exports.default = router;
