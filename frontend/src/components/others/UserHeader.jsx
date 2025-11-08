import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase"; // adjust path if needed
import { collection, getDocs, query, where, limit } from "firebase/firestore";

function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);

    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("email", ">=", term),
        where("email", "<=", term + "\uf8ff"),
        limit(5)
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectUser = (id) => {
    setSearchResults([]);
    setSearchTerm("");
    navigate(`/profile/${id}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link className="block" to="/">
          <span className="sr-only">Home</span>
          <img
            src="/images/quiznestlogo.png"
            alt="QuizNest Logo"
            className="h-12 w-auto sm:h-14 lg:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {["Home", "Profile", "Quizzes"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="block text-gray-600 hover:text-teal-600 dark:text-white dark:hover:text-teal-400 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative hidden sm:block w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users by email..."
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
          />
          {searching && (
            <div className="absolute right-3 top-2 text-gray-400 animate-spin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v4m0 8v4m8-8h4M4 12H0"
                />
              </svg>
            </div>
          )}

          {searchResults.length > 0 && (
            <ul className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-56 overflow-y-auto z-50">
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSelectUser(user.id)}
                  className="px-3 py-2 hover:bg-teal-50 dark:hover:bg-gray-700 cursor-pointer text-sm"
                >
                  <span className="font-medium text-gray-800 dark:text-white">
                    {user.email}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side Buttons (Logout same style as Login/Register) */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex sm:gap-4">
            <button
              onClick={handleLogout}
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
            >
              Logout
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-700 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-gray-300"
          >
            <span className="sr-only">Toggle menu</span>
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <ul className="flex flex-col items-center px-4 py-4 space-y-3 text-sm">
            {["Home", "Profile", "Quizzes"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="block text-gray-600 hover:text-teal-600 dark:text-white dark:hover:text-teal-400 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
            <hr className="w-full border-gray-200 dark:border-gray-700 my-2" />
            <button
              onClick={handleLogout}
              className="block w-full rounded-md bg-teal-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
            >
              Logout
            </button>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default UserHeader;
