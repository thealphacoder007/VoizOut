# 🚀 VoizOut - Fair Job Portal

**VoizOut** is a transparent and community-driven job portal where job seekers (Applicants) can share honest experiences, recruiter interactions, and report suspicious listings. Recruiters can post job openings, and all users contribute to a safer, fairer job application ecosystem.

> ✨ Designed to eliminate fake jobs, prevent scam recruitment, and empower job seekers with real insights.

---

## 🔍 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Run Locally](#-run-locally)
- [Environment Variables](#-environment-variables)
- [Folder Structure](#-folder-structure)
- [API Endpoints](#-api-endpoints)
- [Future Scope](#-future-scope)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Features

### 🧑‍💼 For Applicants
- Register and create your profile
- Search and apply to verified jobs
- Share feedback or reviews about the interview process
- Report suspicious or scam job posts

### 🧑‍💼 For Recruiters
- Register and post job listings
- View applicant responses and filter them
- Access dashboard to manage listings

### ⚙️ Platform Features
- Role-based access: Admin, Recruiter, Applicant
- JWT-based authentication and secure route access
- Real-time notifications for status updates (future)
- Validation on both frontend and backend
- Modular, scalable folder structure and API versioning

---

## 🧠 Tech Stack

| Layer       | Technologies |
|-------------|--------------|
| Frontend    | React.js, Tailwind CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB Atlas |
| Auth        | JWT, bcrypt |
| Validation  | validator |
| File Upload | Multer + Cloudinary (optional) | (future planning)
| Versioning  | RESTful API under `/api/v1/` |

---



## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Om-Takbhate/VoizOut.git 

# Backend setup
cd VoizOut
npm install

# Frontend setup
npm run dev
