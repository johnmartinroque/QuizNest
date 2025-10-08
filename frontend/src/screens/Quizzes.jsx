import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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
        setFilteredQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredQuizzes(quizzes);
    } else {
      const filtered = quizzes.filter((quiz) =>
        quiz.topic.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    }
  }, [search, quizzes]);

  if (loading) return <p className="text-center mt-10">Loading quizzes...</p>;

  if (!filteredQuizzes.length)
    return <p className="text-center mt-10">No quizzes found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Quizzes</h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredQuizzes.map((quiz) => (
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
