# 🧠 LearnFlow - AI-Powered Micro-Learning Platform

> **Master any skill in just 5 minutes a day with personalized AI-driven lessons**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

## 🚀 Live Demo

[**Try LearnFlow →**](your-vercel-url-here)

## ✨ Features

- 🎯 **5-Minute Micro-Lessons** - Perfect bite-sized learning sessions
- 🤖 **AI Personalization** - Adapts to your learning style and pace
- 📊 **Progress Tracking** - Real-time analytics and insights
- 🏆 **Gamification** - Achievements, streaks, and XP system
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Interactive Learning** - Hands-on coding exercises and quizzes

## 🎥 Demo

![LearnFlow Demo](demo.gif)

*Complete user journey from onboarding to lesson completion*

🔥 PRIORITY UPGRADES (High Impact)
✅ 1. Persist Topic-Level Learning Paths
Store learningPath:{topic} in localStorage or backend

Track which steps are complete

Auto-advance to next step in /lesson

Show a per-topic progress bar (e.g. 3/7 completed)

✅ Already 80% done — just needs per-step completion save

✅ 2. Resumable Lessons
Save currentSlideIndex per topic

Resume in-progress lesson when user returns

Add “Continue Learning” on dashboard

✅ 3. In-App Quiz Feedback
Show right/wrong feedback immediately per question

Optionally explain the correct answer

Store quiz performance (used for progress stats)

🎮 ENGAGEMENT / UX ENHANCEMENTS
🎯 4. Gamification
Add XP per lesson/quiz

Level up after XP milestones

Track daily streaks → reward icons

🧠 5. AI Tutor Chat (Optional)
Add a “Tutor” button that opens a sidebar

Powered by OpenAI, helps answer topic questions mid-lesson

🧰 6. Refactor Lesson/Test Flow
Create a /flow or /module/[slug] route

Combines: Intro → Lesson Slides → Quiz → Summary

Clean UX transitions (e.g. Framer Motion)

🔒 NICE-TO-HAVE TECHNICAL
🔧 7. Save All Progress to Backend (Optional)
Use Supabase or Firebase

Let users switch devices and resume learning

Secure user profile + progress

🧪 8. Add Testing
Unit test lesson render logic (Jest/React Testing Library)

Protect future refactors


## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **State Management**: React Hooks, Local Storage
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mihayzp/learnflow.git
cd learnflow

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000