import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

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

  // 🔍 Filter by topic OR tags
  useEffect(() => {
    if (!search.trim()) {
      setFilteredQuizzes(quizzes);
    } else {
      const lowerSearch = search.toLowerCase();

      const filtered = quizzes.filter((quiz) => {
        const topicMatch = quiz.topic?.toLowerCase().includes(lowerSearch);
        const tagMatch = quiz.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerSearch)
        );
        return topicMatch || tagMatch;
      });

      setFilteredQuizzes(filtered);
    }
  }, [search, quizzes]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Quizzes</h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search quizzes by topic or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center mt-10">
          <Spinner />
        </p>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <h2 className="text-xl font-semibold mb-2">{quiz.topic}</h2>
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
              <p className="text-gray-500 text-sm">
                {quiz.questions?.length || 0} questions
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No quizzes found.</p>
      )}
    </div>
  );
}

export default Quizzes;
