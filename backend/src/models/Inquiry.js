import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  phone: String,
  message: { type: String, required: true },
  status: { type: String, enum: ["New", "Contacted", "Closed"], default: "New" }
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);
