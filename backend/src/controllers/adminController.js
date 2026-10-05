import User from "../models/User.js";
import Product from "../models/Product.js";
import Animal from "../models/Animal.js";
import Order from "../models/Order.js";
import Inquiry from "../models/Inquiry.js";

export async function dashboard(req, res) {
  const [users, products, animals, orders, inquiries, revenue] = await Promise.all([
    User.countDocuments(), Product.countDocuments(), Animal.countDocuments(),
    Order.countDocuments(), Inquiry.countDocuments(),
    Order.aggregate([{ $match: { status: { $ne: "Cancelled" } } }, { $group: { _id: null, total: { $sum: "$total" } } }])
  ]);
  const lowStock = await Product.countDocuments({ stock: { $lte: 5 } });
  res.json({ users, products, animals, orders, inquiries, lowStock, revenue: revenue[0]?.total || 0 });
}
export async function users(req, res) {
  res.json(await User.find().select("-passwordHash").sort({ createdAt: -1 }));
}
export async function inquiries(req, res) {
  res.json(await Inquiry.find().populate("user", "name email phone").populate("product", "name").sort({ createdAt: -1 }));
}
