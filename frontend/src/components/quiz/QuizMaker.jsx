import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc } from "firebase/firestore";
import QuizInput from "./QuizInput";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";
import { db } from "../../firebase";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function QuizMaker() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

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
Format strictly as JSON array:
[
  {
    "question": "Question text",
    "options": ["A. Option1", "B. Option2", "C. Option3", "D. Option4"],
    "answer": "A"
  }
]
Do not include extra text or markdown.
`;

      const result = await model.generateContent(prompt);
      let text = result.response.text();

      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const jsonMatch = text.match(/\[([\s\S]*)\]/);
      if (jsonMatch) text = `[${jsonMatch[1]}]`;

      const parsedQuiz = JSON.parse(text);
      setQuiz(parsedQuiz);

      await addDoc(collection(db, "quizzes"), {
        topic,
        questions: parsedQuiz,
        createdAt: new Date(),
      });
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Failed to generate quiz. Try again.");
    }

    setLoading(false);
  };

  const handleSelect = (qIndex, option) => {
    if (showResults) return;
    const letter = option.split(".")[0];
    setAnswers({ ...answers, [qIndex]: letter });
  };

  const submitQuiz = () => setShowResults(true);

  const score = quiz.reduce((acc, q, i) => {
    if (answers[i] === q.answer) return acc + 1;
    return acc;
  }, 0);

  const resetQuiz = () => {
    setQuiz([]);
    setAnswers({});
    setShowResults(false);
    setTopic("");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">QuizNest</h1>

        {!quiz.length && (
          <QuizInput
            topic={topic}
            setTopic={setTopic}
            loading={loading}
            generateQuiz={generateQuiz}
          />
        )}

        {quiz.length > 0 && (
          <>
            {quiz.map((q, i) => (
              <QuizQuestion
                key={i}
                qIndex={i}
                question={q}
                selected={answers[i]}
                showResults={showResults}
                handleSelect={handleSelect}
              />
            ))}

            {!showResults ? (
              <button
                onClick={submitQuiz}
                disabled={Object.keys(answers).length !== quiz.length}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Submit Quiz
              </button>
            ) : (
              <QuizResults
                score={score}
                total={quiz.length}
                resetQuiz={resetQuiz}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuizMaker;
