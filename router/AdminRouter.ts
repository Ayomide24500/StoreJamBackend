import { Router } from "express";
import { Login, Register, verifyAdmin } from "../controller/AdminController";

const router: Router = Router();

router.route("/register").post(Register);
router.route("/verify/:adminID").patch(verifyAdmin);
router.route("/login").post(Login);

export default router;
