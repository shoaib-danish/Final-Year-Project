
import { Router } from "express";
import {getRecruiters,updateRecruiterStatus} from "../controller/admin.controller";import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/recruiters",
  authenticate,
  authorizeAdmin,
  getRecruiters
);

router.patch(
  "/recruiters/:id/status",
  authenticate,
  authorizeAdmin,
  updateRecruiterStatus
);

export default router;
