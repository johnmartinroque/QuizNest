import React from "react";
import { useNavigate } from "react-router-dom";

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
      onClick={() => navigate(`/quiz/${quiz.id}`)}
    >
      <h2 className="text-xl font-semibold mb-2">{quiz.topic}</h2>

      {/* Difficulty badge */}
      {quiz.difficulty && (
        <span
          className={`inline-block mb-2 px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
            quiz.difficulty
          )}`}
        >
          {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
        </span>
      )}

      {/* Tags */}
      {quiz.tags && quiz.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {quiz.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Question count */}
      <p className="text-gray-500 text-sm">
        {quiz.questions?.length || 0} questions
      </p>
    </div>
  );
}

export default QuizCard;
