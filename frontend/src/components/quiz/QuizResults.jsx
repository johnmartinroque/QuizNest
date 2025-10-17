import React from "react";
import { useNavigate } from "react-router-dom";
function QuizResults({ score, total, resetQuiz }) {
  const navigate = useNavigate();

  const handlePromptAgain = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <p className="text-center text-xl font-bold">
        Your Score: {score} / {total}
      </p>
      <button
        onClick={() => {
          resetQuiz();
          handlePromptAgain();
        }}
        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
      >
        Prompt Quiz Again
      </button>
    </div>
  );
}

export default QuizResults;
