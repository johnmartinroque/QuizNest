import React, { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a className="block text-teal-600 dark:text-teal-300" href="#">
          <span className="sr-only">Home</span>
          <svg
            className="h-8"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41Z"
              fill="currentColor"
            />
          </svg>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            {[
              "About",
              "Careers",
              "History",
              "Services",
              "Projects",
              "Blog",
            ].map((item) => (
              <li key={item}>
                <a
                  className="text-gray-500 transition hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex sm:gap-4">
            <a
              className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
              href="#"
            >
              Login
            </a>

            <a
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-700 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-gray-300"
              href="#"
            >
              Register
            </a>
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
            {[
              "About",
              "Careers",
              "History",
              "Services",
              "Projects",
              "Blog",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block text-gray-600 hover:text-teal-600 dark:text-white dark:hover:text-teal-400 transition"
                >
                  {item}
                </a>
              </li>
            ))}
            <hr className="w-full border-gray-200 dark:border-gray-700 my-2" />
            <a
              href="#"
              className="block w-full rounded-md bg-teal-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
            >
              Login
            </a>
            <a
              href="#"
              className="block w-full rounded-md bg-gray-100 px-4 py-2 text-center text-sm font-medium text-teal-600 transition hover:text-teal-700 dark:bg-gray-800 dark:text-white dark:hover:text-gray-300"
            >
              Register
            </a>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
