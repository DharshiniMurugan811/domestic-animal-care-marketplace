import { Router } from "express";
import { createInquiry } from "../controllers/inquiryController.js";
import { protect } from "../middleware/auth.js";
const r = Router();
r.post("/", protect, createInquiry);
export default r;
