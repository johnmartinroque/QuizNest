import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  // ✅ Get logged-in user email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
      else setUserEmail("");
    });
    return () => unsubscribe();
  }, []);

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

        {/* Right side: user dropdown */}
        <div className="relative flex items-center gap-4">
          {userEmail && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span>{userEmail}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Button for mobile */}
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
