import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";

const tokenFor = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export async function register(req, res) {
  try {
    const { name, email, phone, address, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });

    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      phone,
      address,
      passwordHash,
    });

    res.status(201).json({
      token: tokenFor(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email?.toLowerCase(),
    });

    if (
      !user ||
      !(await bcrypt.compare(password || "", user.passwordHash))
    ) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    res.json({
      token: tokenFor(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function me(req, res) {
  const user = await User.findById(req.user._id).select("-passwordHash");
  res.json(user);
}

export async function updateProfile(req, res) {
  const user = await User.findById(req.user._id);

  user.name = req.body.name ?? user.name;
  user.phone = req.body.phone ?? user.phone;
  user.address = req.body.address ?? user.address;

  await user.save();

  res.json({
    message: "Profile updated",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

/* =========================
   WISHLIST / FAVORITES
   ========================= */

// Get all favorite products
export async function getFavorites(req, res) {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "favorites",
      match: { active: true },
      options: { sort: { createdAt: -1 } },
    });

    const favorites = (user?.favorites || []).filter(Boolean);

    res.json(favorites);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// Save a product to wishlist
export async function addFavorite(req, res) {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.active) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: {
          favorites: product._id,
        },
      },
      {
        new: true,
      }
    ).select("favorites");

    res.json({
      message: "Product saved to wishlist",
      favorites: user.favorites,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// Remove a product from wishlist
export async function removeFavorite(req, res) {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          favorites: productId,
        },
      },
      {
        new: true,
      }
    ).select("favorites");

    res.json({
      message: "Product removed from wishlist",
      favorites: user.favorites,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}