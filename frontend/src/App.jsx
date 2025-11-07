import React, { Profiler, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/others/UserHeader";
import Quizzes from "./screens/Quizzes";
import AnswerQuiz from "./screens/AnswerQuiz";
import Register from "./screens/authentication/Register";
import Login from "./screens/authentication/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import UserHeader from "./components/others/UserHeader";
import Profile from "./screens/Profile";
import ProtectedRoute from "./components/others/ProtectedRoute";

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
          <Route
            path="/Profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Profile/:id"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/quiz/:id" element={<AnswerQuiz />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/Home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
