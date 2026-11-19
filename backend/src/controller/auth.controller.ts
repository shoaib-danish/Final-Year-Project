import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

const normalizeEmail = (email: unknown) =>
  String(email || "").trim().toLowerCase();

export const signup = async (req: Request, res: Response) => {
  try {
    const { full_name, password, role } = req.body;
    const email = normalizeEmail(req.body.email);

    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!["student", "recruiter"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (typeof password !== "string" || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const approvalStatus = role === "student" ? "approved" : "pending";

    const { rows } = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, approval_status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, email, role, approval_status`,
      [full_name, email, hashedPassword, role, approvalStatus]
    );

    return res.status(201).json({ message: "Signup successful", user: rows[0] });
  } catch (error: any) {
    // 23505 = Postgres unique violation (email already exists)
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const email = normalizeEmail(req.body.email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
      const test = await pool.query(
      `SELECT id, email, role FROM public.users WHERE id = $1`,
      ["bbf6f167-92b7-481d-83a7-9ccbfb9ba30a"]
    );

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE LOWER(TRIM(email)) = $1",
      [email]
    );
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Recruiter approval check (still disabled, same as before)
    // if (user.role === "recruiter" && user.approval_status !== "approved") {
    //   return res.status(403).json({ message: "Your account is awaiting admin approval" });
    // }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMe = (req: Request, res: Response) => {
  res.json({ user: res.locals.user });
};