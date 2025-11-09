import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

function FollowButton({ targetUserId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUserId(user.uid);
        await checkFollowingStatus(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [targetUserId]);

  const checkFollowingStatus = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setIsFollowing(data.followedUsers?.includes(targetUserId) || false);
      }
    } catch (error) {
      console.error("Error checking follow status:", error);
    }
  };

  const handleFollowToggle = async () => {
    if (!currentUserId || currentUserId === targetUserId) return;
    const userRef = doc(db, "users", currentUserId);
    try {
      if (isFollowing) {
        await updateDoc(userRef, {
          followedUsers: arrayRemove(targetUserId),
        });
      } else {
        await updateDoc(userRef, {
          followedUsers: arrayUnion(targetUserId),
        });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  if (loading || !currentUserId || currentUserId === targetUserId) return null;

  return (
    <button
      onClick={handleFollowToggle}
      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
        isFollowing
          ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
          : "bg-teal-600 hover:bg-teal-700 text-white"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;
