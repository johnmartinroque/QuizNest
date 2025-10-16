import React from "react";

function QuizQuestion({
  qIndex,
  question,
  selected,
  showResults,
  handleSelect,
}) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="font-semibold">
        {qIndex + 1}. {question.question}
      </p>
      <ul className="mt-2 space-y-1">
        {question.options.map((opt, idx) => {
          const letter = opt.split(".")[0];
          const isSelected = selected === letter;
          const isCorrect = showResults && letter === question.answer;
          const isWrong =
            showResults && isSelected && letter !== question.answer;

          return (
            <li
              key={idx}
              onClick={() => handleSelect(qIndex, opt)}
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
              {opt}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuizQuestion;
