# Resumind

Resumind is an AI-powered Resume Analyzer built with **React, React Router v7, and Puter.js** that helps candidates optimize their resumes based on **specific companies and job roles**.

Upload your resume, select a target company and role, and receive:

- 📊 ATS Score tailored to that job
- 🧠 AI-driven feedback
- 🏢 Company-specific improvement suggestions
- 📁 Resume tracking per company & role

Everything runs fully in the browser — no custom backend required.

---

# 🎯 Core Functionality

### 🏢 Company-Wise Resume Tracking

Track different versions of your resume for different companies and job roles.

Each resume analysis is stored with:

- Company name
- Job title
- Job description
- AI feedback
- ATS score
- Resume snapshot

This allows you to:

- Compare performance across companies
- Optimize resume for specific roles
- Maintain multiple targeted resume versions

---

### 📊 ATS Score Optimization

Get a smart ATS score based on:

- Keyword matching
- Role alignment
- Skills relevance
- Experience targeting
- Resume formatting signals

---

### 🧠 AI-Powered Suggestions

Receive structured feedback such as:

- Missing keywords
- Skills to add
- Bullet point improvements
- Formatting improvements
- Strengths & weaknesses
- Overall recommendation

---

### 📂 Resume Storage & History

All resume analyses are stored using Puter KV & File Storage, allowing:

- Resume retrieval
- History tracking
- Company-based filtering
- Persistent resume records

---

# ⚙️ Tech Stack

- **React** – Component-based UI development
- **React Router v7** – File-based routing & data handling
- **Puter.js** – Serverless authentication, file storage, AI & database
- **Tailwind CSS** – Utility-first modern UI
- **TypeScript** – Type-safe scalable development
- **Vite** – Lightning-fast dev server & build tool
- **Zustand** – Minimal global state management
- **PDF.js** – PDF to image/text processing