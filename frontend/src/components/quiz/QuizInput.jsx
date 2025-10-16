import React from "react";

function QuizInput({ topic, setTopic, loading, generateQuiz }) {
  return (
    <div className="space-y-2">
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
    </div>
  );
}

export default QuizInput;
