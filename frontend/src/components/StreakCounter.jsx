import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function StreakCounter() {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const history = data.history || [];

          if (history.length === 0) {
            setStreak(0);
            return;
          }

          // Convert timestamps → local YYYY-MM-DD
          const formatLocalDate = (date) => {
            const local = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000
            );
            return local.toISOString().split("T")[0];
          };

          const days = history
            .map((h) => {
              if (h.takenAt?.seconds) {
                const date = new Date(h.takenAt.seconds * 1000);
                return formatLocalDate(date);
              }
              return null;
            })
            .filter(Boolean)
            .sort((a, b) => new Date(b) - new Date(a)); // newest → oldest

          const uniqueDays = [...new Set(days)];

          let currentStreak = 1;
          for (let i = 0; i < uniqueDays.length - 1; i++) {
            const currentDate = new Date(uniqueDays[i]);
            const prevDate = new Date(uniqueDays[i + 1]);
            const diffDays = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

            if (diffDays === 1) {
              currentStreak++;
            } else if (diffDays > 1) {
              break; // streak breaks
            }
          }

          // ✅ Keep streak if last quiz was today OR yesterday
          const today = new Date();
          const latestQuizDate = new Date(uniqueDays[0]);

          const diffFromToday =
            (today.setHours(0, 0, 0, 0) - latestQuizDate.setHours(0, 0, 0, 0)) /
            (1000 * 60 * 60 * 24);

          if (diffFromToday <= 1) {
            // today (0) or yesterday (1)
            setStreak(currentStreak);
          } else {
            setStreak(0); // missed a day
          }
        } else {
          setStreak(0);
        }
      } catch (err) {
        console.error("Error fetching streak:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <p className="text-gray-600">Loading streak...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-4 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-1">🔥 Streak</h2>
      <p
        className={`text-3xl font-bold ${
          streak > 0 ? "text-orange-500" : "text-gray-500"
        }`}
      >
        {streak} {streak === 1 ? "day" : "days"}
      </p>
      {streak > 0 ? (
        <p className="text-sm text-gray-500">Keep it going!</p>
      ) : (
        <p className="text-sm text-gray-400">Start a new streak today!</p>
      )}
    </div>
  );
}

export default StreakCounter;
