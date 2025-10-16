import React from "react";

function QuizResults({ score, total, resetQuiz }) {
  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <p className="text-center text-xl font-bold">
        Your Score: {score} / {total}
      </p>
      <button
        onClick={resetQuiz}
        className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
      >
        Prompt Quiz Again
      </button>
    </div>
  );
}

export default QuizResults;
