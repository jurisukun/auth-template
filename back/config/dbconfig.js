import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const HOST = process.env.MYSQL_HOST;
const DATABASE = process.env.MYSQL_DATABASE;

export const pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

export const promisePool = pool.promise();
