import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import HistoryCard from "../components/profile/HistoryCard";
import StreakCalendar from "../components/profile/StreakCalendar";
import Spinner from "../components/others/Spinner";
import StreakCounter from "../components/profile/StreakCounter";
import FollowButton from "../components/profile/FollowButton";
import FollowerCount from "../components/profile/FollowerCount";

function ViewProfile() {
  const { id } = useParams(); // 👈 get user id from URL (/profile/:id)
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;

      try {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          setHistory(data.history || []);
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (!userData)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">User not found 😕</h1>
        <p className="text-gray-500 mt-2">
          The profile you’re looking for doesn’t exist.
        </p>
      </div>
    );

  return (
    <div className="pb-12">
      <h1 className="text-2xl font-bold mb-4 text-center">
        👤 {userData.email}'s Profile
      </h1>
      <FollowButton targetUserId={id} />
      <FollowerCount userId={id} />

      <div className="mb-6">
        {/* 🔥 Optional: You can reuse StreakCounter by modifying it to accept a userId prop */}
        <StreakCounter userId={id} />
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

export default ViewProfile;
