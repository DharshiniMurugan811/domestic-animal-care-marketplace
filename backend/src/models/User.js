import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  favoriteAnimals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animal" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
