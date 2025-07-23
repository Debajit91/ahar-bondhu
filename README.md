# 🍛 Ahar Bondhu

Ahar Bondhu is a **community-based food sharing platform** where users can donate or request food. It connects people who have extra food with those in need — minimizing waste and supporting the community. 🌱

---

## 🚀 Live Link

🌐 [Visit Ahar Bondhu](https://your-deployed-site-link.com)

---

## 📂 Project Structure

```bash
client/          # React frontend
├── components/  # Reusable UI components
├── pages/       # Page-level components
├── hooks/       # Custom React hooks
├── utils/       # Helper functions
├── assets/      # Images/icons
└── App.jsx      # Main app component

server/          # Express backend
├── routes/      # API routes
├── DB/          # MongoDB connection utility

└── index.js     # Entry point


🔧 Features
🔐 Firebase Authentication

🧑‍🍳 Food Donation by Authenticated Users

🍽️ Food Request with Modal (With Extra Fields)

🛑 Prevent Duplicate Requests

💌 My Requested Foods Dashboard

🌟 Featured Foods Section

🏆 Top Donators Section (Dynamic with MongoDB aggregation)

🔍 Food Search Functionality (by name)

🖼️ 2 & 3 Column Toggle Layout for Available Foods

⚡ Framer Motion Animations

🔄 TanStack React Query for API Management

✅ Yup + React Hook Form Validation

🔒 Role-Based Protected Routes (coming soon)

🛠️ Tech Stack
Layer	Technology
Frontend	React, Tailwind CSS, React Router DOM
Animations	Framer Motion
Forms	React Hook Form, Yup
HTTP Client	Axios (with axiosInstance)
Backend	Express.js, Node.js, MongoDB (Native Driver)
Auth	Firebase Authentication
Data Fetch	TanStack React Query (v5)

📦 NPM Packages Used
Frontend
npm install react react-dom react-router-dom
npm install axios
npm install react-hook-form yup @hookform/resolvers
npm install framer-motion
npm install @tanstack/react-query
npm install react-toastify
npm install date-fns
npm install firebase
npm install react-icons

Backend
npm install express cors mongodb dotenv

📌 Key Pages & Components
Page	Description
/ (Home)	Hero, Featured Foods, Top Donators, Impact Info
/available-foods	Filtered food list with search + layout toggle
/foods/:id	Detailed food info + request modal
/my-requested-foods	Shows requested foods by current user
/donate	Authenticated form to donate food
/login, /register	Firebase-based auth pages

🧪 Backend API Endpoints
Foods
GET    /api/foods
POST   /api/foods
GET    /api/foods/:id
PATCH  /api/foods/:id/request
Users
bash
Copy
Edit
POST   /api/users/register
GET    /api/users/:id
Top Donators
bash
Copy
Edit
GET    /api/users/top-donators

✍️ Author
Debajit Roy
GitHub Profile: https://github.com/Debajit91

📄 License
This project is open-source and free to use under the MIT License.

