import { Router } from "express";

import {
  register,
  login,
  me,
  updateProfile,
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/authController.js";

import { protect } from "../middleware/auth.js";

const r = Router();

r.post("/register", register);
r.post("/login", login);

r.get("/me", protect, me);
r.put("/profile", protect, updateProfile);

// Wishlist / Favorites
r.get("/favorites", protect, getFavorites);
r.post("/favorites/:productId", protect, addFavorite);
r.delete("/favorites/:productId", protect, removeFavorite);

export default r;