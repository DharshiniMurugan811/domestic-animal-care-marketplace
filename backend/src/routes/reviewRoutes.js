import { Router } from "express";
import { listReviews, createReview, allReviews, moderateReview } from "../controllers/reviewController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.get("/:productId", listReviews);
r.post("/:productId", protect, createReview);
r.get("/admin/all", protect, adminOnly, allReviews);
r.put("/admin/:id", protect, adminOnly, moderateReview);
export default r;
