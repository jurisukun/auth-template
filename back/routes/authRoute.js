import express from "express";
import { login, me } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/me", me);

export { authRouter };
