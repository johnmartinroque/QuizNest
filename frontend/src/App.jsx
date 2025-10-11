import React from "react";
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

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<AnswerQuiz />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
