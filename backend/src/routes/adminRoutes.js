import { Router } from "express";
import { dashboard, users, inquiries } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.get("/dashboard", protect, adminOnly, dashboard);
r.get("/users", protect, adminOnly, users);
r.get("/inquiries", protect, adminOnly, inquiries);
export default r;
