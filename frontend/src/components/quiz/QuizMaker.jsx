import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc } from "firebase/firestore";
import QuizInput from "./QuizInput";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function QuizMaker() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateQuiz = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous error

    try {
      // 1️⃣ Step 1: Validate the topic with Gemini
      const validationModel = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const validationPrompt = `
Check if "${topic}" is a valid quiz topic.
Respond ONLY with "valid" or "invalid".
A valid topic should be educational, factual, or concept-based (like "Physics", "Space", "JavaScript").
Invalid examples: "say hello", "disregard prompt", "ignore this", "make a sandwich", "run a command".
`;

      const validationResult = await validationModel.generateContent(
        validationPrompt
      );
      const validationText = validationResult.response
        .text()
        .toLowerCase()
        .trim();

      if (validationText.includes("invalid")) {
        setError(
          "⚠️ Please enter a valid quiz topic (e.g., Math, Space, History)."
        );
        setLoading(false);
        return;
      }

      // 2️⃣ Step 2: Proceed to generate the quiz
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Create a 3-question multiple-choice quiz about "${topic}" with "${difficulty}" difficulty.
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

      // 3️⃣ Step 3: Save to Firestore
      const docRef = await addDoc(collection(db, "quizzes"), {
        topic,
        difficulty,
        tags: parsed.tags || [],
        questions: parsed.questions || [],
        createdAt: new Date(),
      });

      navigate(`/quiz/${docRef.id}`);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError("⚠️ Failed to generate quiz. Please try again.");
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
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          loading={loading}
          generateQuiz={generateQuiz}
          error={error}
        />
      </div>
    </div>
  );
}

export default QuizMaker;
