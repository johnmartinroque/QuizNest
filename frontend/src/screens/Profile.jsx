import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      setUserEmail(user.email);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setHistory(data.history || []);
        } else {
          console.warn("No user document found.");
          setHistory([]);
        }
      } catch (err) {
        console.error("Error fetching user history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">👤 Profile</h1>
      <p className="text-center text-gray-600 mb-6">{userEmail}</p>

      <h2 className="text-xl font-semibold mb-3">🧠 Quiz History</h2>

      {history.length === 0 ? (
        <p className="text-gray-500">No quiz history yet.</p>
      ) : (
        <ul className="space-y-3">
          {history
            .slice()
            .reverse() // show newest first
            .map((entry, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{entry.topic}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.takenAt.seconds * 1000).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">
                  Score:{" "}
                  <span className="font-medium">
                    {entry.score} / {entry.total}
                  </span>
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;
