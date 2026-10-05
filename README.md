# Domestic Animal Care & Marketplace

A complete MERN-stack final-year CSE project for domestic animal information, animal care, marketplace, authentication, inventory, orders, WhatsApp inquiries, and an AI Animal Assistant.

## Stack
- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT + bcryptjs
- Images: local SVG demo assets; admin can use image URLs
- AI Assistant: Gemini API (optional) with a built-in safe local fallback
- Styling: custom responsive CSS

## Features

### Customer
- Modern responsive animal-care marketplace UI
- English / Tamil-ready interface toggle
- Register / Login / Logout
- JWT authentication
- Profile page
- Animal catalog and detail pages
- Animal categories, search and filters
- Favorites
- Product catalog
- Product details
- Cart
- Checkout
- Cash on Delivery / demo online payment mode
- Order history and order status tracking
- WhatsApp product inquiry
- Reviews
- Animal health and care information
- Animal quiz
- Animal age calculator
- AI Animal Assistant
- Mobile responsive navigation

### Admin
- Protected admin dashboard
- Admin login through the normal login page using admin credentials
- Dashboard statistics
- Add / edit / delete animals
- Add / edit / delete products
- Change stock quantity
- Automatic In Stock / Low Stock / Out of Stock status
- Enable / disable products
- Order management
- Change order status
- User list
- Review moderation
- Inquiry list

## Quick Start

### 1. MongoDB
Install MongoDB locally or use MongoDB Atlas.

### 2. Backend
```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

Windows PowerShell:
```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run seed
npm run dev
```

Backend runs at:
http://localhost:5000

### 3. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

## Default admin

After `npm run seed`:

Email:
`admin@domesticcare.com`

Password:
`Admin@12345`

**Change this password before real deployment.**

## AI Assistant

The project works without an AI API key using a local animal-care fallback.

For Gemini AI:
1. Create a Gemini API key.
2. Put it in `backend/.env`:
```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
```
3. Restart backend.

The assistant is intended for educational animal-care guidance and tells users to consult a veterinarian for diagnosis/emergency situations.

## Environment

Backend `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/domestic_animal_care
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@domesticcare.com
ADMIN_PASSWORD=Admin@12345
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
CLIENT_URL=http://localhost:5173
```

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Production notes
- Use HTTPS.
- Use a strong JWT secret.
- Change the seeded admin password.
- Configure MongoDB Atlas.
- Configure a real image storage provider if large image uploads are required.
- Configure a real payment gateway only after the core order flow is tested.
- Never commit `.env`.

## Project structure

```text
domestic-animal-care-marketplace/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── scripts/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
└── README.md
```
