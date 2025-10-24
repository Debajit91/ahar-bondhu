# 🍛 Ahar Bondhu

Ahar Bondhu is a **community-based food sharing platform** where users can donate or request food. It connects people who have extra food with those in need — minimizing waste and supporting the community. 🌱

---

## 🚀 Live Link

🌐 [Visit Ahar Bondhu](https://aharbondhu.web.app)

---
## ✨ Features

- 🔐 **User Authentication** — Signup / Login via Firebase  
- 🍛 **Add Surplus Food** — Share extra food easily  
- 🙋‍♀️ **Request Food** — Request available food with optional notes  
- 💬 **Groq AI Chatbot** — Get instant help & guidance  
- 📦 **Food Management** — Manage donated and requested foods   
- 📍 **Nearby Food Tracking** — See foods available near you  
- 📱 **Responsive Design** — Works perfectly on any device  
- 🌈 **Modern UI** — Built with TailwindCSS and Framer Motion animations  
- 🔄 TanStack React Query for API Management
- ✅ Yup + React Hook Form Validation

---

## 🛠️ Tech Stack

| Area | Technologies |
|------|---------------|
| **Frontend** | React.js, TailwindCSS, React Hook Form, React Toastify |
| **Backend** | Node.js, Express.js, MongoDB |
| **Authentication** | Firebase Authentication |
| **AI Integration** | Groq AI Chatbot |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home Page](https://github.com/Debajit91/ahar-bondhu/blob/main/aharbondhu.web.app_.png)

### 🍲 Available Foods
![Available Foods](https://github.com/Debajit91/ahar-bondhu/blob/main/aharbondhu.web.app_%20(1).png)

### 💬 Chatbot
![Chatbot](https://github.com/Debajit91/ahar-bondhu/blob/main/aharbondhu.web.app_%20(2).png)


## 📂 Project Structure

Ahar-Bondhu/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── Api/
│   └── public/
└── server/             # Node + Express backend
    ├── routes/
    ├── controllers/
    └── index.js



🔒 Role-Based Protected Routes (coming soon)


📦 NPM Packages Used
Frontend
npm install react react-dom react-router
npm install axios
npm install react-hook-form yup @hookform/resolvers
npm install framer-motion
npm install @tanstack/react-query
npm install react-toastify
npm install date-fns
npm install firebase
npm install react-icons
npm install react-leaflet
npm install react slick

Backend
npm install express cors mongodb dotenv @xenova/transformers nodemailer

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

📧 Contact

👨‍💻 Developer: Debajit Roy
📩 Email: debajitroy544@gmail.com

🌍 Portfolio: https://debajitroy-portfolio.vercel.app

🐙 GitHub: https://github.com/Debajit91

