import jsonwebtoken from "jsonwebtoken";
import { promisePool } from "../config/dbconfig.js";

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
