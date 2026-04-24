"use client";
import Link from 'next/link';
import Sidebar from './Sidebar';
import { useState } from "react";

export default function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900 antialiased">
      
      {/* HEADER */}
      <header className="sticky top-0 z-60 w-full border-b border-slate-200 bg-white/60 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-black text-xl group-hover:rotate-6 transition-transform">
              W
            </div>
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-indigo-600">WALLPAPER</span>
              <span className="text-slate-800">HUB</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Discover</Link>
            <Link href="/popular" className="hover:text-indigo-600 transition-colors">Trending</Link>
            <Link href="/new" className="hover:text-indigo-600 transition-colors">Recent</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search hidden on mobile */}
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search wallpapers..." 
                className="w-64 pl-10 pr-4 py-2 bg-slate-100/70 border border-transparent focus:border-indigo-500 focus:bg-white rounded-xl text-sm transition-all outline-none shadow-sm"
              />
            </div>
            
            <button className="hidden sm:block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-indigo-300 transition-all active:scale-95">
              Upload
            </button>

            {/* Hamburger for mobile */}
            <button 
              className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-200"
              onClick={() => setSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={`flex-1 p-2 md:p-0 bg-white/50 backdrop-blur-sm rounded-tl-3xl shadow-inner transition-transform duration-300 ease-in-out ${sidebarOpen ? 'lg:translate-x-0 translate-x-64' : 'translate-x-0'}`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2026 WallpaperHub.</p>
          <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
