import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import HistoryCard from "../components/profile/HistoryCard"; // adjust path if needed
import StreakCounter from "../components/profile/StreakCounter";
import StreakCalendar from "../components/profile/StreakCalendar";
import Spinner from "../components/others/Spinner";
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
        <p className="text-gray-600">
          <Spinner />
        </p>
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">👤 Profile</h1>
      <p className="text-center text-gray-600 mb-6">{userEmail}</p>

      <div className="mb-6">
        <StreakCounter />
        <StreakCalendar history={history} />
      </div>
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">🧠 Quiz History</h2>

        {history.length === 0 ? (
          <p className="text-gray-500">No quiz history yet.</p>
        ) : (
          <ul className="space-y-3">
            {history
              .slice()
              .reverse()
              .map((entry, index) => (
                <HistoryCard key={index} entry={entry} />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
