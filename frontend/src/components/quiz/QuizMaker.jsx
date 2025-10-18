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
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Create a 3-question multiple-choice quiz about "${topic}".
Also generate 3 to 5 short descriptive tags related to the topic (e.g., for "JavaScript": ["programming", "technology", "web development"]).
Return only a JSON object in this exact format:
{
  "tags": ["tag1", "tag2", "tag3"],
  "questions": [
    {
      "question": "Question text",
      "options": ["A. Option1", "B. Option2", "C. Option3", "D. Option4"],
      "answer": "A"
    }
  ]
}
`;

      const result = await model.generateContent(prompt);
      let text = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();
      const parsed = JSON.parse(text);

      const docRef = await addDoc(collection(db, "quizzes"), {
        topic,
        tags: parsed.tags || [],
        questions: parsed.questions || [],
        createdAt: new Date(),
      });

      // redirect to the quiz page
      navigate(`/quiz/${docRef.id}`);
    } catch (err) {
      console.error("Error generating quiz:", err);
      alert("⚠️ Failed to generate quiz. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">QuizNest</h1>
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
