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

## Tech Stack

Frontend: React + Vite, HTML, Tailwind CSS, JavaScript

Database: Firebase

AI/ML: Google Generative AI (Gemini) for quiz generation

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
