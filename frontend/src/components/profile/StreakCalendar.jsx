import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../App.css";
function StreakCalendar({ history }) {
  const [date, setDate] = useState(new Date());

  // Format a date in local time as YYYY-MM-DD
  const formatLocalDate = (date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().split("T")[0];
  };

  // Collect all streak dates (in local timezone)
  const streakDates = new Set(
    history.map((entry) => {
      const d = new Date(entry.takenAt.seconds * 1000);
      return formatLocalDate(d);
    })
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatLocalDate(date);
      const todayStr = formatLocalDate(new Date());
      const isToday = dateStr === todayStr;
      const hasStreak = streakDates.has(dateStr);

      if (hasStreak) return "streak-day"; // green
      if (isToday) return "today-day"; // gray (no streak)
      return "normal-day"; // light gray
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        🔥 Streak Calendar
      </h2>

      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
        className="rounded-xl"
      />

      <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-sm"></div> Streak Day
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-sm"></div> Today (No
          streak)
        </div>
      </div>
    </div>
  );
}

export default StreakCalendar;
