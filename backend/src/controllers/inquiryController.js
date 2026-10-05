import Inquiry from "../models/Inquiry.js";
export async function createInquiry(req, res) {
  const item = await Inquiry.create({ ...req.body, user: req.user?._id });
  res.status(201).json(item);
}
