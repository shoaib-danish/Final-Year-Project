
import { Request, Response } from "express";
import { pool } from "../config/db.js";

// Get recruiter's own profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;

    const { rows } = await pool.query(
      "SELECT * FROM recruiter_profiles WHERE user_id = $1",
      [userId]
    );

    return res.status(200).json({ profile: rows[0] || null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create or update recruiter's profile
export const saveProfile = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;

    // Read frontend field names (camelCase)
    const {
      companyName,
      designation,
      website,
      contactNumber,
      companyDescription,
    } = req.body;

    // Validate company name
    if (!companyName?.trim()) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }

    const { rows } = await pool.query(
      `INSERT INTO recruiter_profiles
       (user_id, company_name, designation, website, contact_number, description)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id)
       DO UPDATE SET
         company_name = EXCLUDED.company_name,
         designation = EXCLUDED.designation,
         website = EXCLUDED.website,
         contact_number = EXCLUDED.contact_number,
         description = EXCLUDED.description,
         updated_at = NOW()
       RETURNING *`,
      [
        userId,
        companyName.trim(),
        designation || null,
        website || null,
        contactNumber || null,
        companyDescription || null,
      ]
    );

    return res.status(200).json({
      message: "Profile saved successfully",
      profile: rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
