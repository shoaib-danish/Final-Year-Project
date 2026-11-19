
import { Router } from "express";
import { getProfile, saveProfile } from "../controller/recruiter.controller.js";
import { authenticate, authorizeRecruiter } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/profile", authenticate, authorizeRecruiter, getProfile);
router.post("/profile", authenticate, authorizeRecruiter, saveProfile);

export default router;
