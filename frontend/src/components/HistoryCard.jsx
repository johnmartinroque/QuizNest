import React from "react";

function HistoryCard({ entry }) {
  return (
    <li className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{entry.topic}</h3>
        <span className="text-sm text-gray-500">
          {entry.takenAt?.seconds
            ? new Date(entry.takenAt.seconds * 1000).toLocaleString()
            : "Unknown date"}
        </span>
      </div>
      <p className="text-gray-700 mt-1">
        Score:{" "}
        <span className="font-medium">
          {entry.score} / {entry.total}
        </span>
      </p>
    </li>
  );
}

export default HistoryCard;
