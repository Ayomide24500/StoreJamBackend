import { Router } from "express";
import { getUser, Register } from "../controller/UserCheckoutController";

const router: Router = Router();

router.route("/register-user").post(Register);
router.route("/get-user").get(getUser);

export default router;
