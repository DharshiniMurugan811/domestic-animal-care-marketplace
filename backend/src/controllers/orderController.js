import Order from "../models/Order.js";
import Product from "../models/Product.js";

export async function createOrder(req, res) {
  const { items, address, paymentMethod = "COD" } = req.body;
  if (!items?.length || !address) return res.status(400).json({ message: "Items and address are required" });

  const ids = items.map(i => i.product);
  const products = await Product.find({ _id: { $in: ids }, active: true });
  const map = new Map(products.map(p => [String(p._id), p]));
  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const p = map.get(String(item.product));
    const qty = Math.max(1, Number(item.quantity || 1));
    if (!p) return res.status(400).json({ message: "A product is unavailable" });
    if (p.stock < qty) return res.status(400).json({ message: `${p.name} has only ${p.stock} left` });
    const price = Math.round(p.price * (1 - p.discount / 100));
    subtotal += price * qty;
    orderItems.push({ product: p._id, name: p.name, image: p.image, price, quantity: qty });
  }

  const deliveryFee = subtotal >= 1500 ? 0 : 80;
  const order = await Order.create({
    user: req.user._id, items: orderItems, subtotal, deliveryFee, total: subtotal + deliveryFee,
    address, paymentMethod, paymentStatus: paymentMethod === "DEMO_ONLINE" ? "Paid" : "Pending"
  });

  for (const item of orderItems) await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  res.status(201).json(order);
}

export async function myOrders(req, res) {
  res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }));
}
export async function allOrders(req, res) {
  res.json(await Order.find().populate("user", "name email phone").sort({ createdAt: -1 }));
}
export async function updateOrder(req, res) {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}
