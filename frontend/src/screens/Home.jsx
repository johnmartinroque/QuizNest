import React from "react";
import BackendStatus from "../components/BackendStatus";
import GeminiChat from "../components/GeminiChat";
import QuizMaker from "../components/QuizMaker";

function Home() {
  return (
    <div>
      Home
      <BackendStatus />
      <GeminiChat />
      <QuizMaker />
    </div>
  );
}

export default Home;
