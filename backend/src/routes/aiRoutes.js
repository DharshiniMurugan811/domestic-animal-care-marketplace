import { Router } from "express";
import { askAnimalAI } from "../services/aiService.js";
const r = Router();
r.post("/ask", async (req, res) => {
  try {
    if (!req.body.message?.trim()) return res.status(400).json({ message: "Question is required" });
    const answer = await askAnimalAI(req.body.message.trim());
    res.json({ answer });
  } catch (e) { res.status(500).json({ message: "AI assistant is temporarily unavailable" }); }
});
export default r;
