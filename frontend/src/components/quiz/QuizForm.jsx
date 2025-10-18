import React, { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase";

function QuizForm({ quiz, topic, quizId }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIndex, option) => {
    if (showResults) return;
    const letter = option.split(".")[0];
    setAnswers({ ...answers, [qIndex]: letter });
  };

  const submitQuiz = async () => {
    setShowResults(true);

    // ✅ Save result to Firestore if user is logged in
    const user = auth.currentUser;
    if (user) {
      const score = quiz.reduce(
        (acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc),
        0
      );

      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          history: arrayUnion({
            quizId,
            topic,
            score,
            total: quiz.length,
            takenAt: new Date(),
          }),
        });
        console.log("✅ Quiz history saved!");
      } catch (err) {
        console.error("Error saving history:", err);
      }
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  const score = quiz.reduce(
    (acc, q, i) => (answers[i] === q.answer ? acc + 1 : acc),
    0
  );

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
