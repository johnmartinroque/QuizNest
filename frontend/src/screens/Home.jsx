import React from "react";
import BackendStatus from "../components/BackendStatus";
import GeminiChat from "../components/GeminiChat";

function Home() {
  return (
    <div>
      Home
      <BackendStatus />
      <GeminiChat />
    </div>
  );
}

export default Home;
