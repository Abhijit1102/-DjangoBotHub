
# 🛠️ Django + React Fullstack App

A fullstack web application powered by **Django REST Framework** (backend) and **React** (frontend). This project showcases robust API consumption, JWT authentication, and a modern Streamlit-inspired UI.

---

## 🚀 Features

### 🔙 Backend (Django)
- 🔐 **JWT Authentication** using `rest_framework_simplejwt`
- 📁 Serves static `home.json` content
- 👤 User **Signup API** (`POST /api/v1/sign-up/`)
- 🆔 Authenticated **Profile API** (`GET /api/v1/profile/`)
- ✅ **Health Check** endpoint (`GET /api/v1/health/`)
- ⚙️ **Redis + Celery** for async task handling (e.g. email notifications)

---

### 🔜 Frontend (React + Vite)
- 📡 **Axios** for seamless API communication
- 🔀 **React Router DOM** for SPA navigation
- 🎨 **Tailwind CSS** for a sleek, responsive UI
- 📋 Displays API metadata, features, and routes
- 💡 Inspired by **Streamlit UX** for clarity and minimalism

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abhijit1102/DjangoBotHub.git
cd DjangoBotHub
```

---

## 2️⃣ Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt # or uv pip install -e . 
python manage.py migrate
python manage.py runserver
```

---

## 3️⃣ Celery & Redis (For Background Tasks)

```bash
docker run -d --name redis -p 6379:6379 redis:7
celery -A Bothub worker --loglevel=info --pool=solo
```

---

## 4️⃣ Webhook Setup (via Telegram API)

Once your server is publicly available (e.g. using ngrok):

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-domain.com/chat/"
```

> Replace `<YOUR_BOT_TOKEN>` and `your-domain.com` accordingly.

**This setup will allow Telegram to POST updates to `/chat/`, and your handlers (`/start`, `/chat`) will respond using OpenAI.**

---

## 5️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
DjangoBotHub/
├── backend/              # Django Backend
│   ├── Bothub/           # Django App
│   ├── api/              # API Logic
│   └── manage.py
├── frontend/             # React Frontend (Vite)
│   ├── src/
│   └── index.html
└── README.md
```

---

## 🧪 API Overview

| Endpoint           | Method | Auth Required | Description                 |
|--------------------|--------|---------------|-----------------------------|
| `/api/v1/home/`    | GET    | ❌            | Returns static `home.json` |
| `/api/v1/sign-up/` | POST   | ❌            | Create new user            |
| `/api/v1/token/`   | POST   | ❌            | Obtain JWT tokens          |
| `/api/v1/profile/` | GET    | ✅            | Return user profile data   |
| `/api/v1/health/`  | GET    | ❌            | Server health check        |
