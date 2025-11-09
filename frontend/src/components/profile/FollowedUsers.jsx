import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";

function FollowedUsers() {
  const [followed, setFollowed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // get logged-in user document
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const followedIds = data.followedUsers || [];

          // fetch each followed user's data
          const followedUsersData = [];
          for (const id of followedIds) {
            const followedRef = doc(db, "users", id);
            const followedSnap = await getDoc(followedRef);
            if (followedSnap.exists()) {
              followedUsersData.push({
                id,
                ...followedSnap.data(),
              });
            }
          }

          setFollowed(followedUsersData);
        } else {
          setFollowed([]);
        }
      } catch (error) {
        console.error("Error fetching followed users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-6">
        <p className="text-gray-500">Loading followed users...</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-3">👥 Followed Users</h2>

      {followed.length === 0 ? (
        <p className="text-gray-500">You’re not following anyone yet.</p>
      ) : (
        <ul className="space-y-3">
          {followed.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {user.name || "Unnamed User"}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <Link
                to={`/profile/${user.id}`}
                className="text-teal-600 text-sm font-medium hover:underline"
              >
                View Profile →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FollowedUsers;
