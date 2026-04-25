"use client";

import Link from "next/link";
import Sidebar from "./Sidebar";
import { useState, createContext, useContext, useCallback } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Search, X } from "lucide-react";

export const SearchContext = createContext({
  searchQuery: "",
  setSearchQuery: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const clearSearch = useCallback(() => {
    setSearchInput("");
    setSearchQuery("");
  }, []);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className="flex flex-col min-h-screen bg-background text-primary antialiased">
        {/* HEADER */}
        <header className="sticky top-0 z-30 w-full border-b border-border bg-surface/80 backdrop-blur-xl shadow-sm">
          <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg text-primary hover:bg-muted/20 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <Link
                href="/"
                className="flex items-center gap-2 group"
                onClick={clearSearch}
              >
                <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-black text-xl group-hover:rotate-6 transition-transform">
                  W
                </div>
                <div className="text-xl font-extrabold tracking-tight hidden sm:block">
                  <span className="text-accent">WALLPAPER</span>
                  <span className="text-primary">HUB</span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-muted">
              <Link
                href="/"
                className="hover:text-accent transition-colors"
                onClick={clearSearch}
              >
                Discover
              </Link>
              <Link
                href="/popular"
                className="hover:text-accent transition-colors"
                onClick={clearSearch}
              >
                Trending
              </Link>
              <Link
                href="/new"
                className="hover:text-accent transition-colors"
                onClick={clearSearch}
              >
                Recent
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative hidden sm:block"
              >
                <span className="absolute inset-y-0 left-3 flex items-center text-muted">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={
                    searchQuery
                      ? `Results: ${searchQuery}`
                      : "Search wallpapers..."
                  }
                  className={`w-48 xl:w-64 pl-10 pr-10 py-2 bg-background border rounded-xl text-sm transition-all outline-none ${
                    searchQuery
                      ? "border-accent text-accent"
                      : "border-border focus:border-accent"
                  }`}
                />
                {(searchInput || searchQuery) && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>

              {/* Theme toggle */}
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Search Results Bar */}
        {searchQuery && (
          <div className="bg-accent/5 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <p className="text-sm text-muted">
                Showing results for{" "}
                <span className="text-accent font-semibold">
                  "{searchQuery}"
                </span>
              </p>
              <button
                onClick={clearSearch}
                className="text-sm text-muted hover:text-primary flex items-center gap-1 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className="flex flex-1 max-w-7xl mx-auto w-full">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </div>

        {/* FOOTER */}
        <footer className="py-6 md:py-8 border-t border-border bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">© 2026 WallpaperHub.</p>
            <div className="flex gap-6 text-xs font-bold text-muted uppercase tracking-widest">
              <Link
                href="#"
                className="hover:text-accent transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-accent transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="hover:text-accent transition-colors"
              >
                API
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </SearchContext.Provider>
  );
}