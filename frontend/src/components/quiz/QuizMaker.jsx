import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc } from "firebase/firestore";
import QuizInput from "./QuizInput";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function QuizMaker() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `
Create a 3-question multiple-choice quiz about ${topic}.
Return only a JSON array:
[
  {
    "question": "Question text",
    "options": ["A. Option1", "B. Option2", "C. Option3", "D. Option4"],
    "answer": "A"
  }
]
`;

      const result = await model.generateContent(prompt);
      let text = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();
      const parsed = JSON.parse(text);

      const docRef = await addDoc(collection(db, "quizzes"), {
        topic,
        questions: parsed,
        createdAt: new Date(),
      });

      // redirect to AnswerQuiz
      navigate(`/quiz/${docRef.id}`);
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Failed to generate quiz. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center">QuizNest</h1>
        <QuizInput
          topic={topic}
          setTopic={setTopic}
          loading={loading}
          generateQuiz={generateQuiz}
        />
      </div>
    </div>
  );
}

export default QuizMaker;
