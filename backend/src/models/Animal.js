import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  tamilName: { type: String, default: "" },
  category: { type: String, required: true },
  scientificName: { type: String, default: "" },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  shortDescription: { type: String, default: "" },
  description: { type: String, default: "" },
  lifespan: { type: String, default: "" },
  diet: [{ type: String }],
  housing: { type: String, default: "" },
  benefits: [{ type: String }],
  diseases: [{ type: String }],
  vaccination: [{ type: String }],
  care: [{ type: String }],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Animal", animalSchema);
