# 🧠 QuizNest [Website Link](https://emerg-tech.vercel.app)


An interactive quiz platform that lets users test their knowledge, track progress, and monitor learning streaks — built with React, Firebase, and TailwindCSS.
## Overview

AI Quiz Maker is a frontend-first web application that allows users to instantly generate multiple-choice quizzes on any topic. Students or learners can practice independently, receive instant feedback on their answers, and reinforce their understanding of key concepts.

This project aligns with SDG 4: Quality Education, specifically Target 4.4, by enhancing learning outcomes and skills through accessible, interactive tools.

## 🚀 Features

- 🧩 Dynamic Quizzes – Play topic-based quizzes loaded from Firestore.
- 💾 Quiz History Tracking – Automatically records scores and progress per quiz.
- 🔥 Streak System – Keep track of your daily quiz streaks
- 📊 User Statistics – View performance summaries and completion data.
- 👤 Profile Page – See your quiz history, streak calendar, and progress overview.
- 🧮 Instant Feedback – Get results immediately after submitting a quiz.
- 🔐 Firebase Authentication – Secure login and registration system.

## 🎮 How to Play

1. Enter a topic prompt — QuizNest will generate a quiz based on your chosen topic.
2. Answer the questions and submit to instantly see your score.
3. Browse quizzes created from other users’ prompts and try them out.
4. Track your progress in your profile, including quiz history, streaks, and performance stats.

## Tech Stack

- **Frontend:** React, React Router
- **Database:** Firebase
- **State Management:** In-memory per lobby
- **AI:** Google Generative AI (Gemini) for quiz generation


## 🏃 How to Run
### Installation
1️⃣ Clone the repository
```bash
git clone https://github.com/johnmartinroque/QuizNest.git
cd QuizNest
```

2️⃣ Install dependencies
```bash
npm install

#Frontend (React app)
cd ../frontend
npm install
```

3️⃣ Configure environment variables
```bash
#Create a .env file inside the /frontend directory:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```


4️⃣ Run the App Locally
```bash
npm start
```



## Architecture

Simplified Flow:

User Input (Topic) → React Frontend → Google Gemini AI → Generated Quiz → Frontend Rendering → Student Practice & Score Feedback

Steps:

Users enter a topic or upload study material.

The frontend sends a request to the Gemini AI model to generate a 3-question multiple-choice quiz.

The AI returns structured JSON containing questions, options, and correct answers.

Questions are dynamically rendered in the browser.

Users answer the questions and receive instant feedback on their score.


## Biggest Challenge: Generating meaningful multiple-choice questions in real-time.

Solution: Carefully crafted prompts and JSON templates for Gemini AI, combined with frontend logic to format and display questions dynamically.


## Summary

QuizNest provides a fast, fun, and interactive way to practice and test knowledge on any topic. Leveraging AI, it supports self-directed learning, personalized practice, and skill enhancement — empowering students and learners to improve their understanding and retain knowledge effectively.
