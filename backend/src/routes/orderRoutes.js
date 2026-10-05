import { Router } from "express";
import { createOrder, myOrders, allOrders, updateOrder } from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.post("/", protect, createOrder);
r.get("/mine", protect, myOrders);
r.get("/admin/all", protect, adminOnly, allOrders);
r.put("/:id/status", protect, adminOnly, updateOrder);
export default r;
