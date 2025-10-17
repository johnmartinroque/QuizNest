import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import QuizForm from "../components/quiz/QuizForm";

function AnswerQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizRef = doc(db, "quizzes", id);
        const quizSnap = await getDoc(quizRef);
        if (quizSnap.exists()) {
          const data = quizSnap.data();
          setQuiz(data.questions);
          setTopic(data.topic);
        } else {
          alert("Quiz not found!");
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading quiz...</p>;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <QuizForm quiz={quiz} topic={topic} />
    </div>
  );
}

export default AnswerQuiz;
