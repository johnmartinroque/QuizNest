import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaArrowUp, FaChevronDown, FaChevronRight } from "react-icons/fa";

function UserStatistics({ history = [] }) {
  const [range, setRange] = useState("Last 7 days");

  // Group quizzes by day
  const dailyData = useMemo(() => {
    const counts = {};
    history.forEach((entry) => {
      const date = new Date(entry.takenAt.seconds * 1000).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" }
      );
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  }, [history]);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {dailyData.reduce((a, b) => a + b.count, 0)}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Quizzes answered {range.toLowerCase()}
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-400 text-center">
          12%
          <FaArrowUp className="w-3 h-3 ml-1" />
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyData}>
            <defs>
              <linearGradient id="colorQuiz" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="text-gray-200" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorQuiz)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          {/* Dropdown */}
          <button
            onClick={() =>
              setRange((prev) =>
                prev === "Last 7 days" ? "Last 30 days" : "Last 7 days"
              )
            }
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 inline-flex items-center dark:hover:text-white"
          >
            {range}
            <FaChevronDown className="w-3 h-3 ml-1.5" />
          </button>

          {/* Link */}
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2"
          >
            Quiz Report
            <FaChevronRight className="w-2.5 h-2.5 ml-1.5 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserStatistics;
