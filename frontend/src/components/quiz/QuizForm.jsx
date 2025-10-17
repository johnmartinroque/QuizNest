import React, { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";

function QuizForm({ quiz, topic }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

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

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">🎯 {topic} Quiz</h1>

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
        <QuizResults score={score} total={quiz.length} resetQuiz={resetQuiz} />
      )}
    </div>
  );
}

export default QuizForm;
