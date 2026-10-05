import Review from "../models/Review.js";

export async function listReviews(req, res) {
  res.json(await Review.find({ product: req.params.productId, approved: true }).populate("user", "name").sort({ createdAt: -1 }));
}
export async function createReview(req, res) {
  const review = await Review.create({ ...req.body, product: req.params.productId, user: req.user._id });
  res.status(201).json(review);
}
export async function allReviews(req, res) {
  res.json(await Review.find().populate("user", "name email").populate("product", "name").sort({ createdAt: -1 }));
}
export async function moderateReview(req, res) {
  const r = await Review.findByIdAndUpdate(req.params.id, { approved: req.body.approved }, { new: true });
  res.json(r);
}
