import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function QuizMaker() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Generate AI quiz
  const generateQuiz = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setQuiz([]);
    setAnswers({});
    setShowResults(false);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
      Create a 3-question multiple-choice quiz about ${topic}.
      Format the output strictly as JSON array:
      [
        {"question": "Question text", "options": ["A", "B", "C", "D"], "answer": "A"}
      ]
      Do not include any markdown formatting or extra text.
      `;

      const result = await model.generateContent(prompt);
      let text = result.response.text();

      // Clean Gemini response
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
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

  // Handle user selecting an answer
  const handleSelect = (qIndex, option) => {
    if (showResults) return; // prevent changes after submission
    setAnswers({ ...answers, [qIndex]: option });
  };

  // Submit quiz and show results
  const submitQuiz = () => {
    setShowResults(true);
  };

  // Calculate score
  const score = quiz.reduce((acc, q, i) => {
    if (answers[i] === q.answer) return acc + 1;
    return acc;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">🎯 AI Quiz Maker</h1>

        {!quiz.length && (
          <>
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
          </>
        )}

        {quiz.length > 0 && (
          <>
            {quiz.map((q, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <p className="font-semibold">
                  {i + 1}. {q.question}
                </p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, idx) => {
                    const isSelected = answers[i] === opt;
                    const isCorrect = showResults && opt === q.answer;
                    const isWrong =
                      showResults && isSelected && opt !== q.answer;

                    return (
                      <li
                        key={idx}
                        onClick={() => handleSelect(i, opt)}
                        className={`ml-4 p-1 rounded cursor-pointer
    ${
      showResults
        ? opt === q.answer
          ? "bg-green-300"
          : answers[i] === opt
          ? "bg-red-300"
          : "bg-gray-100"
        : answers[i] === opt
        ? "bg-blue-200"
        : "bg-gray-100"
    }
  `}
                      >
                        {opt}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {!showResults && (
              <button
                onClick={submitQuiz}
                disabled={Object.keys(answers).length !== quiz.length}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Submit Quiz
              </button>
            )}

            {showResults && (
              <p className="text-center mt-4 text-xl font-bold">
                Your Score: {score} / {quiz.length}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuizMaker;
