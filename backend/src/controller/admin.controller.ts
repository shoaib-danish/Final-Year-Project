import { Request, Response } from "express";
import { pool } from "../config/db.js";


export const getRecruiters = async (
  req: Request,
  res: Response
) => {
  try {
    const status = req.query.status || "pending";

    if (!["pending", "approved", "rejected"].includes(status as string)) {
      return res.status(400).json({
        message: "Invalid recruiter status",
      });
    }

    const { rows } = await pool.query(
    `SELECT u.id, u.full_name, u.email, u.approval_status, u.created_at,
        rp.company_name, rp.designation, rp.website, rp.contact_number, rp.description
   FROM users u
   LEFT JOIN recruiter_profiles rp ON u.id = rp.user_id
    WHERE u.role = 'recruiter' AND u.approval_status = $1
    ORDER BY u.created_at DESC`,
    [status]
    );

    return res.status(200).json({
      recruiters: rows,
    });

  } catch (error) {
    console.error("Fetch recruiters error:", error);

    return res.status(500).json({
      message: "Failed to fetch recruiters",
    });
  }
};


export const updateRecruiterStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid approval status",
      });
    }

    const { rows } = await pool.query(
      `UPDATE users
       SET approval_status = $1
       WHERE id = $2
       AND role = 'recruiter'
       RETURNING id, full_name, email, approval_status`,
      [status, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Recruiter not found",
      });
    }

    return res.status(200).json({
      message: `Recruiter ${status} successfully`,
      recruiter: rows[0],
    });

  } catch (error) {
    console.error("Update recruiter status error:", error);

    return res.status(500).json({
      message: "Failed to update recruiter status",
    });
  }
};
