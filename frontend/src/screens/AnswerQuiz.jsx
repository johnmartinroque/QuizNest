import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function AnswerQuiz() {
  const { id } = useParams(); // quiz ID from URL
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Fetch quiz from Firestore
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizRef = doc(db, "quizzes", id);
        const quizSnap = await getDoc(quizRef);
        if (quizSnap.exists()) {
          const data = quizSnap.data();
          setQuiz(data.questions);
          setTopic(data.topic);
        } else {
          alert("Quiz not found!");
          navigate("/"); // redirect if quiz doesn't exist
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
      setLoading(false);
    };

    fetchQuiz();
  }, [id, navigate]);

  // Handle selecting an answer
  const handleSelect = (qIndex, option) => {
    if (showResults) return;
    const letter = option.split(".")[0];
    setAnswers({ ...answers, [qIndex]: letter });
  };

  const submitQuiz = () => setShowResults(true);

  const score = quiz.reduce(
    (acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc),
    0
  );

  if (loading) return <p className="text-center mt-10">Loading quiz...</p>;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">🎯 {topic} Quiz</h1>

        {quiz.map((q, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <p className="font-semibold">
              {i + 1}. {q.question}
            </p>
            <ul className="mt-2 space-y-1">
              {q.options.map((opt, idx) => {
                const letter = opt.split(".")[0];
                const isSelected = answers[i] === letter;
                const isCorrect = showResults && letter === q.answer;
                const isWrong =
                  showResults && isSelected && letter !== q.answer;

                return (
                  <li
                    key={idx}
                    onClick={() => handleSelect(i, opt)}
                    className={`ml-4 p-1 rounded cursor-pointer ${
                      showResults
                        ? isCorrect
                          ? "bg-green-300"
                          : isWrong
                          ? "bg-red-300"
                          : "bg-gray-100"
                        : isSelected
                        ? "bg-blue-200"
                        : "bg-gray-100"
                    }`}
                  >
                    {opt} {showResults && isCorrect ? "✅" : ""}
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
          <div className="flex flex-col items-center space-y-2 mt-4">
            <p className="text-center text-xl font-bold">
              Your Score: {score} / {quiz.length}
            </p>
            <button
              onClick={() => navigate("/quizzes")}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
            >
              Back to Quizzes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnswerQuiz;
