import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "quizzes"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading quizzes...</p>;

  if (!quizzes.length)
    return <p className="text-center mt-10">No quizzes available.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/quiz/${quiz.id}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{quiz.topic}</h2>
            <p className="text-gray-500 text-sm">
              {quiz.questions.length} questions
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;
