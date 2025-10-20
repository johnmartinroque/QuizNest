import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import QuizCard from "../components/QuizCard";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

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

  // 🔍 Filter by topic/tags + difficulty
  useEffect(() => {
    let filtered = quizzes;

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter((quiz) => {
        const topicMatch = quiz.topic?.toLowerCase().includes(lowerSearch);
        const tagMatch = quiz.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerSearch)
        );
        return topicMatch || tagMatch;
      });
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter(
        (quiz) => quiz.difficulty?.toLowerCase() === difficultyFilter
      );
    }

    setFilteredQuizzes(filtered);
  }, [search, difficultyFilter, quizzes]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Quizzes</h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <input
          type="text"
          placeholder="Search quizzes by topic or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center mt-10">
          <Spinner />
        </p>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No quizzes found.</p>
      )}
    </div>
  );
}

export default Quizzes;
