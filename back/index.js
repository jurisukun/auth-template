import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyparser from "body-parser";
import cors from "cors";

import { authRouter } from "./routes/authRoute.js";
import { getRouter } from "./routes/getRoute.js";

import { authToken } from "./middlewares/verify.js";

const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", authRouter);
app.use("/get", authToken, getRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
