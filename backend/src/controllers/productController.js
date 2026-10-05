import Product from "../models/Product.js";

export async function listProducts(req, res) {
  const q = req.query.q || "";
  const category = req.query.category || "";
  const filter = { active: true, ...(category ? { category } : {}), ...(q ? { name: new RegExp(q, "i") } : {}) };
  res.json(await Product.find(filter).sort({ createdAt: -1 }));
}
export async function adminProducts(req, res) {
  res.json(await Product.find().sort({ createdAt: -1 }));
}
export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}
export async function createProduct(req, res) {
  res.status(201).json(await Product.create(req.body));
}
export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}
export async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
}
