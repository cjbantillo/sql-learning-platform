# 🧠 Interactive SQL Learning Web App with AI Tutor

An interactive web-based platform for learning SQL — inspired by W3Schools and SoloLearn — enhanced with **AI-driven query feedback, progress tracking, gamification, and voice-assisted commands**.

---

## 🚀 Overview

This project aims to make SQL learning **interactive, personalized, and AI-assisted**.  
Learners can:
- Practice SQL directly in the browser  
- Use voice input to ask questions or run queries  
- Get real-time AI explanations using GPT  
- Track learning progress and earn achievements  
- Admins can manage lessons and quizzes via dashboard  

Built using:
- **React + Vite (TypeScript + TailwindCSS)** — for a fast, beautiful frontend
- **Django + Supabase (PostgreSQL + Auth)** — for backend, authentication, and persistent data
- **OpenAI GPT + LangChain** — for AI query explanation, correction, and learning assistance
- **Web Speech API** — for voice input integration

---

## 🧩 Tech Stack Summary

| Layer | Technology |
|--------|-------------|
| **Frontend** | React + Vite + TypeScript + TailwindCSS |
| **Backend** | Django (Python) |
| **Database & Auth** | Supabase (managed PostgreSQL + Auth) |
| **AI Integration** | OpenAI GPT-4 / GPT-4o-mini via LangChain |
| **Speech-to-Text** | Web Speech API |
| **Deployment** | Frontend → Vercel / Backend → Supabase Functions |
| **Core Features** | Interactive SQL Editor, AI Tutor Chatbot, Voice Command Input, Progress Tracking, Gamified Badges, Admin Lesson Creator, Data Visualization |

---

## 🏗️ Project Structure

sql-ai-learning-app/
│
├── frontend/ # React + Vite app
│ ├── src/
│ │ ├── components/
│ │ │ ├── Editor/ # Interactive SQL Editor (Monaco or CodeMirror)
│ │ │ ├── Chatbot/ # AI Tutor chat interface
│ │ │ ├── VoiceInput/ # Web Speech API integration
│ │ │ ├── Dashboard/ # Progress tracking + badges
│ │ │ ├── Admin/ # Lesson management tools
│ │ │ └── Charts/ # Data visualization (Recharts / Chart.js)
│ │ ├── pages/
│ │ ├── utils/
│ │ ├── hooks/
│ │ └── services/
│ ├── index.html
│ ├── vite.config.ts
│ └── package.json
│
├── backend/ # Django project
│ ├── config/
│ ├── api/
│ │ ├── models/ # Lesson, UserProgress, Badge models
│ │ ├── views/ # API endpoints
│ │ ├── serializers/
│ │ └── routers/
│ ├── langchain_integration/ # OpenAI + LangChain logic
│ ├── requirements.txt
│ └── manage.py
│
├── supabase/ # SQL schema, triggers, and setup scripts
│ ├── init.sql
│ ├── policies.sql
│ └── storage/
│
└── README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/sql-ai-learning-app.git
cd sql-ai-learning-app
2️⃣ Setup Backend (Django)
bash
Copy code
cd backend
python -m venv venv
source venv/bin/activate  # (Linux/Mac)
venv\Scripts\activate     # (Windows)

pip install -r requirements.txt
Create .env file in /backend:

ini
Copy code
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_api_key
DJANGO_SECRET_KEY=your_secret_key
LANGCHAIN_API_KEY=optional_if_using_langchain_hub
Run migrations:

bash
Copy code
python manage.py migrate
python manage.py runserver
3️⃣ Setup Frontend (React + Vite)
bash
Copy code
cd frontend
npm install
npm run dev
Create .env in /frontend:

ini
Copy code
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your_supabase_api_key
VITE_API_URL=http://127.0.0.1:8000/api
4️⃣ Connect Supabase
Create a new Supabase project

Enable:

PostgreSQL (Database)

Auth (Email + Password)

Create tables:

users, lessons, progress, badges

Set RLS policies for user-specific data

🤖 AI Integration
LangChain + OpenAI
Located in /backend/langchain_integration/.

Example function:

python
Copy code
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

def explain_sql_query(query):
    llm = ChatOpenAI(model="gpt-4o-mini")
    prompt = ChatPromptTemplate.from_template(
        "Explain in simple terms what the following SQL query does:\n\n{query}"
    )
    return llm.invoke(prompt.format(query=query))
Use cases:

AI Tutor Chatbot: Step-by-step explanations, syntax help, conceptual Q&A

SQL Correction: Suggest improved or correct SQL syntax

Natural Language to SQL: Convert user requests to valid SQL

🎤 Voice Command Integration
Using Web Speech API (frontend):

ts
Copy code
const recognition = new window.webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  // Send to AI or SQL interpreter
};
recognition.start();
Example commands:

“Show all students older than 20”
“Explain what INNER JOIN does”

🧮 Core Features Implementation Notes
Feature	Implementation
Interactive SQL Editor	Monaco Editor / CodeMirror 6; connect to Django API endpoint to execute queries safely in sandbox
AI Tutor Chatbot	GPT-4o-mini with LangChain; conversational memory via sessionStorage
Voice Command Input	Web Speech API; sends natural language to AI for interpretation
Progress Tracking	Store in Supabase (user_progress table); update on lesson completion
Gamified Badges	Trigger DB update when goals are reached
Admin Lesson Creator	Protected route in frontend; CRUD via Django REST API
Data Visualization	Use Chart.js or Recharts for query result visualization

☁️ Deployment
Frontend → Vercel
Connect repo to Vercel

Set environment variables (VITE_SUPABASE_URL, etc.)

Deploy main branch

Backend → Supabase Edge Functions or Render
Host Django API on Render or Supabase Functions

Ensure CORS enabled for frontend domain

🧭 Roadmap
Phase	Feature	Status
Phase 1	Core SQL Editor + Lesson Pages	⏳ Planned
Phase 2	AI Tutor + Voice Input	⏳ Planned
Phase 3	Progress Tracking + Badges	⏳ Planned
Phase 4	Admin Dashboard + Analytics	⏳ Planned
Phase 5	Polish UI & Deploy	⏳ Planned

📜 License
MIT License © 2025 Your Name

🙌 Credits
React

Django

Supabase

OpenAI

LangChain

TailwindCSS

