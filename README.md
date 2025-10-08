AI Quiz Maker

🎯 Generate interactive quizzes on any topic using AI!

Overview

AI Quiz Maker is a frontend-first web application that allows users to instantly generate multiple-choice quizzes on any topic. Students or learners can practice independently, receive instant feedback on their answers, and reinforce their understanding of key concepts.

This project aligns with SDG 4: Quality Education, specifically Target 4.4, by enhancing learning outcomes and skills through accessible, interactive tools.

Features

Dynamic Quiz Generation: Enter any topic, and the system generates a 3-question multiple-choice quiz automatically using Google Generative AI (Gemini).

Interactive Answer Selection: Click on options to select answers. Correct and incorrect answers are highlighted after submission.

Instant Score Feedback: Users see their scores immediately after submitting a quiz.

Responsive Design: Works seamlessly on both desktop and mobile devices.

Future Enhancements Planned:

User profiles to track progress

Quiz history page

Ability to answer quizzes created by others and search by topic or keyword

Tech Stack

Frontend: React + Vite, HTML, Tailwind CSS, JavaScript

AI/ML: Google Generative AI (Gemini) for quiz generation

Architecture

Simplified Flow:

User Input (Topic) → React Frontend → Google Gemini AI → Generated Quiz → Frontend Rendering → Student Practice & Score Feedback

Steps:

Users enter a topic or upload study material.

The frontend sends a request to the Gemini AI model to generate a 3-question multiple-choice quiz.

The AI returns structured JSON containing questions, options, and correct answers.

Questions are dynamically rendered in the browser.

Users answer the questions and receive instant feedback on their score.


Biggest Challenge: Generating meaningful multiple-choice questions in real-time.

Solution: Carefully crafted prompts and JSON templates for Gemini AI, combined with frontend logic to format and display questions dynamically.


Summary

AI Quiz Maker provides a fast, fun, and interactive way to practice and test knowledge on any topic. Leveraging AI, it supports self-directed learning, personalized practice, and skill enhancement — empowering students and learners to improve their understanding and retain knowledge effectively.
