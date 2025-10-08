import { useEffect, useState } from "react";

function BackendStatus() {
  const [status, setStatus] = useState("Checking backend connection...");
  const [color, setColor] = useState("gray");

  useEffect(() => {
    // Change URL if your Flask server runs on a different port
    fetch("http://localhost:5000/")
      .then((res) => {
        if (res.ok) {
          setStatus("✅ Backend is connected!");
          setColor("green");
        } else {
          setStatus("⚠️ Backend responded with an error.");
          setColor("orange");
        }
      })
      .catch(() => {
        setStatus("❌ Cannot connect to backend.");
        setColor("red");
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#f9f9f9",
        color,
        fontSize: "1.2rem",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      {status}
    </div>
  );
}

export default BackendStatus;
