import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const verifyConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("connected to postgreSQL database");
    client.release();
  } catch (error) {
    console.log("error connect to postgreSQL database", error);
  }
};

verifyConnection();

export default pool;
