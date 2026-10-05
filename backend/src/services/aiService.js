const fallback = {
  cow: "For cattle, provide clean water, balanced feed, shade, clean housing and routine veterinary care. Sudden appetite loss, breathing difficulty, severe diarrhea or inability to stand needs prompt veterinary attention.",
  goat: "Goats need clean water, suitable forage, minerals and dry, well-ventilated housing. Watch for reduced appetite, diarrhea, coughing, abnormal breathing and lameness. Contact a veterinarian for persistent or severe signs.",
  dog: "Dogs need balanced nutrition, fresh water, exercise, parasite prevention and routine veterinary checkups. Do not give human medicines unless a veterinarian specifically advises them.",
  cat: "Cats need species-appropriate food, clean water, a clean litter area and regular veterinary care. Persistent vomiting, breathing problems or inability to urinate are urgent signs.",
  default: "Domestic animals need clean water, suitable nutrition, safe housing, hygiene and preventive veterinary care. I can provide general educational information, but a veterinarian should diagnose illness or prescribe treatment."
};

function localAnswer(message) {
  const m = message.toLowerCase();
  for (const key of ["cow", "goat", "dog", "cat"]) if (m.includes(key)) return fallback[key];
  return fallback.default;
}

export async function askAnimalAI(message) {
  if (!process.env.GEMINI_API_KEY) return localAnswer(message);

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const prompt = `You are an educational domestic-animal care assistant. Answer briefly and clearly. Do not diagnose disease or prescribe medication. For emergencies or serious symptoms, advise a veterinarian. User question: ${message}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) return localAnswer(message);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || localAnswer(message);
}
