import Animal from "../models/Animal.js";

export async function listAnimals(req, res) {
  const q = req.query.q || "";
  const category = req.query.category || "";
  const filter = {
    ...(q ? { $or: [{ name: new RegExp(q, "i") }, { shortDescription: new RegExp(q, "i") }] } : {}),
    ...(category ? { category } : {})
  };
  res.json(await Animal.find(filter).sort({ featured: -1, name: 1 }));
}

export async function getAnimal(req, res) {
  const animal = await Animal.findById(req.params.id);
  if (!animal) return res.status(404).json({ message: "Animal not found" });
  res.json(animal);
}

export async function createAnimal(req, res) {
  res.status(201).json(await Animal.create(req.body));
}
export async function updateAnimal(req, res) {
  const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!animal) return res.status(404).json({ message: "Animal not found" });
  res.json(animal);
}
export async function deleteAnimal(req, res) {
  await Animal.findByIdAndDelete(req.params.id);
  res.json({ message: "Animal deleted" });
}
