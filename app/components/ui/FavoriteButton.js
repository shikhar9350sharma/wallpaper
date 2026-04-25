"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function FavoriteButton({ wallpaper }) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("wallpaper-favorites");
    if (stored && wallpaper?.id) {
      const favorites = JSON.parse(stored);
      setIsFavorited(favorites.some((fav) => fav.id === wallpaper.id));
    }
  }, [wallpaper?.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();

    const stored = localStorage.getItem("wallpaper-favorites");
    const favorites = stored ? JSON.parse(stored) : [];

    if (isFavorited) {
      const updated = favorites.filter((fav) => fav.id !== wallpaper.id);
      localStorage.setItem("wallpaper-favorites", JSON.stringify(updated));
      setIsFavorited(false);
    } else {
      const newFavorite = {
        id: wallpaper.id,
        url: wallpaper.url || wallpaper.image,
        name: wallpaper.name || wallpaper.title || "Untitled Wallpaper",
        addedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        "wallpaper-favorites",
        JSON.stringify([...favorites, newFavorite])
      );
      setIsFavorited(true);
    }

    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`
        absolute top-3 left-3 p-2 backdrop-blur-md rounded-lg transition-all duration-300 z-10
        ${
          isFavorited
            ? "bg-accent/80 text-white opacity-100"
            : "bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-accent/60"
        }
      `}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
    </button>
  );
}