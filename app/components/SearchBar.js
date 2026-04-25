"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <span className="absolute inset-y-0 left-3 flex items-center text-muted">
        <Search className="h-4 w-4" />
      </span>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wallpapers..."
        className="w-full pl-10 pr-10 py-2.5 bg-background border border-border focus:border-accent rounded-xl text-sm transition-all outline-none"
      />
      
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}