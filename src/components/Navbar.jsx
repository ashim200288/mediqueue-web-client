"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomNavLink from "./CustomNavLink";

import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();

  const getInitials = (name) => {
    if (!name) return "?";
    const names = name.split(" ");
    if (names.length > 1) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm dark:border-emerald-950 dark:bg-[#022c22] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white focus:outline-none"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white text-lg">
                🩺
              </span>
              <span className="text-emerald-700 dark:text-emerald-400">
                Medi
              </span>
              Queue
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 h-16">
            <CustomNavLink to="/">
              <span>🏠</span> Home
            </CustomNavLink>
            <CustomNavLink to="/tutors">Tutors</CustomNavLink>

            {user && (
              <>
                <CustomNavLink to="/add-tutor">Add tutor</CustomNavLink>
                <CustomNavLink to="/my-tutors">My tutors</CustomNavLink>
                <CustomNavLink to="/my-bookings">My bookings</CustomNavLink>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/40 focus:outline-none"
            >
              {isDarkMode ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.226.226a5 5 0 01-7.072 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {user && (
              <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900/40 relative">
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            )}

            {isPending ? (
              <div className="w-9 h-9 rounded-md bg-slate-100 dark:bg-emerald-900/30 animate-pulse"></div>
            ) : !user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/40 transition-all"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-all shadow-sm"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative flex items-center gap-3 ml-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-emerald-300 hidden lg:inline-block">
                  {user?.name}
                </span>

                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-md bg-emerald-600 text-white font-bold text-sm tracking-wider focus:outline-none hover:bg-emerald-700 transition-colors"
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    getInitials(user?.name)
                  )}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-10 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white py-1 shadow-xl border border-slate-100 dark:bg-[#022c22] dark:border-emerald-800">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-emerald-900">
                      <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-emerald-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-emerald-900/40"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      👤 My profile
                    </Link>
                    <Link
                      href="/my-bookings"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-emerald-900/40"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      💳 My bookings
                    </Link>
                    <Link
                      href="/my-tutors"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-emerald-900/40"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      📖 My tutors
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left font-medium text-rose-600 border-t border-slate-100 dark:border-emerald-900 dark:text-rose-400 hover:bg-slate-50 dark:hover:bg-emerald-900/40"
                    >
                      🚪 Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-emerald-400"
            >
              {isDarkMode ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.226.226a5 5 0 01-7.072 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-900"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 dark:border-emerald-900 dark:bg-[#022c22] flex flex-col items-stretch">
          <CustomNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            🏠 Home
          </CustomNavLink>
          <CustomNavLink
            to="/tutors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            📚 Tutors
          </CustomNavLink>

          {user ? (
            <>
              <CustomNavLink
                to="/add-tutor"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ➕ Add tutor
              </CustomNavLink>
              <CustomNavLink
                to="/my-tutors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📖 My tutors
              </CustomNavLink>
              <CustomNavLink
                to="/my-bookings"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                💳 My bookings
              </CustomNavLink>

              <div className="w-full border-t border-slate-100 dark:border-emerald-900 pt-4 mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-md bg-emerald-600 text-white font-bold text-sm">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      getInitials(user?.name)
                    )}
                  </div>
                  <div className="max-w-[150px]">
                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-none truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-emerald-400 mt-1 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center border border-slate-200 rounded-lg py-2 text-sm font-medium text-slate-700 dark:border-emerald-800 dark:text-emerald-300"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-emerald-600 rounded-lg py-2 text-sm font-medium text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;