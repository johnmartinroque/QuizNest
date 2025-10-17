import React, { Profiler, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/Header";
import Quizzes from "./screens/Quizzes";
import AnswerQuiz from "./screens/AnswerQuiz";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import UserHeader from "./components/UserHeader";
import Profile from "./screens/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null; // or show a loading spinner

  return (
    <div>
      <Router>
        {user ? <UserHeader /> : <Header />}
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/quiz/:id" element={<AnswerQuiz />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
