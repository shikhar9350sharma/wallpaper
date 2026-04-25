"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Trash2, FolderHeart } from "lucide-react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("wallpaper-favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("wallpaper-favorites", JSON.stringify(favorites));
    }
  }, [favorites, loading]);

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      setFavorites([]);
    }
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-accent border-t-transparent"></div>
        <p className="mt-4 text-muted font-medium">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-border p-8 md:p-12">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
              <Heart className="w-3 h-3" />
              {favorites.length} saved
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary">
            My <span className="text-accent">Favorites</span>
          </h1>
          <p className="text-muted text-lg mt-3 max-w-xl">
            Your personal collection of saved wallpapers.
          </p>
        </div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
            <FolderHeart className="h-8 w-8 text-muted" />
          </div>
          <p className="text-muted text-lg font-medium">No favorites yet</p>
          <p className="text-muted text-sm mt-1">
            Browse wallpapers and click the heart icon to save them here
          </p>
        </div>
      )}

      {/* Favorites Grid */}
      {favorites.length > 0 && (
        <>
          <div className="flex justify-end">
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {favorites.map((img, index) => (
              <div
                key={img.id || index}
                className="group relative rounded-xl overflow-hidden shadow-sm border border-border 
                 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] 
                 transition-all duration-300 ease-out cursor-pointer bg-surface"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.name || "Favorite wallpaper"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading={index < 4 ? "eager" : "lazy"}
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <button
                    onClick={() => removeFavorite(img.id)}
                    className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-destructive/80"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <a
                      href={img.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
                      onClick={handleDownloadClick}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-primary truncate">
                    {img.name || "Untitled Wallpaper"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted">
                    <Heart className="h-3.5 w-3.5 fill-accent text-accent" />
                    Saved to favorites
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}