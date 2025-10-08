import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./components/Header";
import Quizzes from "./screens/Quizzes";
import AnswerQuiz from "./screens/AnswerQuiz";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<AnswerQuiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
