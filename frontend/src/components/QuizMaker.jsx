import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function QuizMaker() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setQuiz([]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
      Create a 5-question multiple-choice quiz about ${topic}.
      Format the output strictly as JSON array:
      [
        {"question": "Question text", "options": ["A", "B", "C", "D"], "answer": "A"}
      ]
      Do not include any markdown formatting or extra text.
      `;

      const result = await model.generateContent(prompt);
      let text = result.response.text();

      // 🧹 Clean Gemini’s response if it includes markdown or extra text
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // 🧠 Try to extract only the JSON array portion
      const jsonMatch = text.match(/\[([\s\S]*)\]/);
      if (jsonMatch) text = `[${jsonMatch[1]}]`;

      const parsedQuiz = JSON.parse(text);
      setQuiz(parsedQuiz);
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Failed to generate quiz. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">🎯 AI Quiz Maker</h1>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g. JavaScript, Space, History)"
          className="w-full border p-2 rounded-lg"
        />

        <button
          onClick={generateQuiz}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>

        {quiz.length > 0 && (
          <div className="mt-4 space-y-4">
            {quiz.map((q, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <p className="font-semibold">
                  {i + 1}. {q.question}
                </p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, idx) => (
                    <li key={idx} className="ml-4">
                      🟢 {opt}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-gray-600">
                  ✅ Correct Answer: <b>{q.answer}</b>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizMaker;
