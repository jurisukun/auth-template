import express from "express";
import { getUsers } from "../controllers/getController.js";

const getRouter = express.Router();

getRouter.get("/users", getUsers);

export { getRouter };
