"use client";

import Link from "next/link";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary antialiased">
      {/* HEADER */}
      <header className="sticky top-0 z-30 w-full border-b border-border bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger - mobile only */}
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

            <Link href="/" className="flex items-center gap-2 group">
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
            <Link href="/" className="hover:text-accent transition-colors">
              Discover
            </Link>
            <Link href="/popular" className="hover:text-accent transition-colors">
              Trending
            </Link>
            <Link href="/new" className="hover:text-accent transition-colors">
              Recent
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-3 flex items-center text-muted">
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
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search wallpapers..."
                className="w-48 xl:w-64 pl-10 pr-4 py-2 bg-background border border-border focus:border-accent rounded-xl text-sm transition-all outline-none"
              />
            </div>

            {/* Theme toggle */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="py-6 md:py-8 border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">© 2026 WallpaperHub.</p>
          <div className="flex gap-6 text-xs font-bold text-muted uppercase tracking-widest">
            <Link href="#" className="hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              API
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}