# 🚀 BuildFolio-AI is AI-Powered Resume to Portfolio Generator

BuildFolio-AI is an advanced SaaS platform that converts any normal **Resume PDF** into a highly professional, animated, and responsive **Portfolio Website** within seconds. Just upload your resume and let AI handle the rest automatically.

▶️ **Live Demo:** https://buildfolio-ai.vercel.app/  
📦 **Backend API:** https://resume-to-portfolio-ai.onrender.com

---

# ✨ Features

- 📄 **Instant Resume Parsing**  
  Extracts resume content using the powerful `pdf2json` parsing engine.

- 🧠 **AI-Powered Data Structuring**  
  Uses Groq’s `llama-3.3-70b-versatile` model to convert raw resume text into clean structured JSON data.

- 🎨 **Modern Animated UI**  
  Premium glassmorphism design with smooth animations powered by Framer Motion.

- 🌓 **Dark & Light Mode**  
  Fully responsive theme system optimized using Tailwind CSS v4.

- ⚡ **Dynamic Portfolio URLs**  
  Automatically generates unique portfolio links for every user.

- 🔒 **Secure Database Architecture**  
  MongoDB Atlas integration with robust schema mapping and reliable cloud storage.

---

# 🛠️ Tech Stack

## Frontend
- React.js (Vite)
- Tailwind CSS v4
- Framer Motion
- Lucide React
- Axios

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- Groq Cloud API
- Multer
- Pdf2json

---

# 📁 Project Structure

```text
resume-to-portfolio-ai/
├── client/                 # Frontend Vite React App
│   ├── src/
│   │   ├── pages/          # Home.jsx, Portfolio.jsx
│   │   ├── api.js          # Axios base configuration
│   │   ├── index.css       # Tailwind CSS v4 setup
│   │   └── App.jsx
│   └── package.json
│
└── server/                 # Backend Express API
    ├── models/             # Mongoose schemas
    ├── parser.js           # AI parsing engine
    ├── index.js            # Main server entry
    └── package.json
```

---

# 🚀 Local Setup & Installation

## Prerequisites

Make sure the following are installed on your system:

- Node.js
- npm

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/madhusailesh/resume-to-portfolio-ai.git

cd resume-to-portfolio-ai
```

---

# 2️⃣ Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the backend server:

```bash
node index.js
```

You should see:

```bash
🚀 Server running on port 5000
DB Connected ✅
```

---

# 3️⃣ Frontend Setup

Open a new terminal and navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 🌐 Deployment Guide

## Backend Deployment (Render)

### Settings

- Root Directory: `server`
- Build Command:

```bash
npm install
```

- Start Command:

```bash
node index.js
```

### Environment Variables

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

---

## Frontend Deployment (Vercel)

### Settings

- Root Directory: `client`
- Framework Preset: `Vite`

### Environment Variables

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

---



# 👨‍💻 Author

Made with ❤️ by **Madhu Sailesh Sasamal**

- GitHub: https://github.com/madhusailesh
- LinkedIn: https://www.linkedin.com/in/madhu-sailesh-sasamal-6918912a4/

---

# ⭐ Support

If you liked this project, consider giving it a ⭐ on GitHub.

---
 