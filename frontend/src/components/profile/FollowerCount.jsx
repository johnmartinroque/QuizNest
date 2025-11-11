import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust the path if needed

function FollowerCount({ userId }) {
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!userId) return;
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFollowerCount((data.followers && data.followers.length) || 0);
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [userId]);

  return (
    <div className="text-center mt-2 text-gray-700">
      <span className="font-semibold">{followerCount}</span>{" "}
      <span className="text-gray-500">followers</span>
    </div>
  );
}

export default FollowerCount;
