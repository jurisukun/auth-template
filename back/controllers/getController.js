import { promisePool } from "../config/dbconfig.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
