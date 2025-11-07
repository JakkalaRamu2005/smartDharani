import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: /* process.env.DB_PASSWORD */ "MYSQL@2024!Ramu#",
  database: process.env.DB_NAME,
});



try {
  const connection = await db.getConnection();
  console.log("✅ Connected to MySQL database!");
  connection.release();
} catch (err) {
  console.error("❌ Database connection failed:", err);
}

export default db;
