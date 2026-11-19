
import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

const createAdmin = async () => {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password || password.length < 8) {
    throw new Error("Check ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const { rows } = await pool.query(
      `INSERT INTO users
       (full_name, email, password_hash, role, approval_status)
       VALUES ($1, $2, $3, 'admin', 'approved')
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email, role`,
      [name, email, hashedPassword]
    );

    console.log(
      rows.length ? "Admin created successfully:" : "This email already exists.",
      rows[0] ?? email
    );
  } finally {
    await pool.end();
  }
};

createAdmin().catch((error) => {
  console.error("Admin creation failed:", error.message);
  process.exitCode = 1;
});
