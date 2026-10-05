import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  animalCategory: { type: String, default: "General" },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.virtual("stockStatus").get(function () {
  if (this.stock <= 0) return "out";
  if (this.stock <= 5) return "low";
  return "in";
});

productSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Product", productSchema);
