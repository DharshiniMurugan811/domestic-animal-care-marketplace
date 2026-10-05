import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

/*
  Local development:
  - If CLIENT_URL is empty, allow all origins.

  Production:
  - Set CLIENT_URL to your Netlify URL in Render.
*/
const clientUrl = process.env.CLIENT_URL?.trim();

app.use(
  cors({
    origin: clientUrl || true,
  })
);

app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Domestic Animal Care API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Server error",
  });
});

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`API running on port ${port}`);
  });
});