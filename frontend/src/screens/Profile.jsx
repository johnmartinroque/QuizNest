import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import HistoryCard from "../components/profile/HistoryCard";
import StreakCounter from "../components/profile/StreakCounter";
import StreakCalendar from "../components/profile/StreakCalendar";
import Spinner from "../components/others/Spinner";

function Profile() {
  const { id } = useParams(); // ✅ Get user ID from URL
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      try {
        let targetUserId = id || auth.currentUser?.uid; // ✅ Use :id if present, else current user
        if (!targetUserId) {
          console.warn("No user ID found");
          setLoading(false);
          return;
        }

        setUserId(targetUserId);

        const userRef = doc(db, "users", targetUserId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserEmail(data.email || "Unknown User");
          setHistory(data.history || []);
        } else {
          console.warn("No user document found for:", targetUserId);
          setUserEmail("Unknown User");
          setHistory([]);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">👤 Profile</h1>
      <p className="text-center text-gray-600 mb-6">{userEmail}</p>

      <div className="mb-6">
        <StreakCounter userId={userId} />
        <StreakCalendar history={history} />
      </div>

      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-3">🧠 Quiz History</h2>

        {history.length === 0 ? (
          <p className="text-gray-500 text-center">No quiz history yet.</p>
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
