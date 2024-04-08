import jsonwebtoken from "jsonwebtoken";
import { promisePool } from "../config/dbconfig.js";

export const me = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token is required", error: true });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log("decode", decoded);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", error: true });
    }
    const [rows] = await promisePool.query("SELECT * FROM users WHERE id = ?", [
      decoded.userid,
    ]);
    res.status(200).json({ user: rows[0] });
  } catch (error) {
    console.log("ERROR...", error);
    return res
      .status(401)
      .json({ message: "Internal Server Error", error: true });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jsonwebtoken.sign(
      { username, userid: rows[0]?.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
