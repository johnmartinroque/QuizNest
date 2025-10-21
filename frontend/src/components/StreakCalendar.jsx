import React from "react";

function StreakCalendar({ history }) {
  // Normalize and extract dates with streaks
  const streakDates = new Set(
    history.map((entry) => {
      const date = new Date(entry.takenAt.seconds * 1000);
      return date.toISOString().split("T")[0]; // YYYY-MM-DD
    })
  );

  // Generate last 30 days (newest last)
  const today = new Date();
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const hasStreak = streakDates.has(dateStr);
    days.push({
      dateStr,
      hasStreak,
      isToday: i === 0,
    });
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        🔥 Streak Calendar
      </h2>

      <div className="grid grid-cols-7 gap-2 justify-items-center">
        {days.map((day) => (
          <div
            key={day.dateStr}
            title={day.dateStr}
            className={`w-8 h-8 rounded-md border text-xs flex items-center justify-center
              ${
                day.hasStreak
                  ? "bg-green-500 text-white"
                  : day.isToday
                  ? "bg-gray-400 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
          >
            {new Date(day.dateStr).getDate()}
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-3">
        Green = Streak | Gray = No streak today
      </p>
    </div>
  );
}

export default StreakCalendar;
