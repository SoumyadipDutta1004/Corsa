// - Add route skeleton for user login, register
import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
