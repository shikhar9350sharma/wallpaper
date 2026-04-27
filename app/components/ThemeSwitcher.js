"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";

const themes = [
  {
    id: "midnight",
    name: "Midnight Plum",
    colors: { bg: "#F8F5F2", accent: "#7C3AED" },
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    colors: { bg: "#F0F4F8", accent: "#0EA5E9" },
  },
  {
    id: "forest",
    name: "Forest Zen",
    colors: { bg: "#FAF7F2", accent: "#059669" },
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    colors: { bg: "#FFF7ED", accent: "#EA580C" },
  },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("midnight");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("wallpaper-theme");
    if (saved) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("wallpaper-theme", themeId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl border border-border bg-surface text-primary hover:bg-muted/20 transition-all"
        title="Change theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-12.5 right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl z-50 p-2">
            <p className="text-xs font-bold text-muted uppercase tracking-wider px-3 py-2">
              Choose Theme
            </p>
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  currentTheme === theme.id
                    ? "bg-accent/10 text-accent"
                    : "text-primary hover:bg-muted/10"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border-2 shrink-0"
                  style={{ 
                    backgroundColor: theme.colors.bg, 
                    borderColor: theme.colors.accent 
                  }}
                />
                <span className="flex-1 text-left">{theme.name}</span>
                {currentTheme === theme.id && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}