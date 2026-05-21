"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import FavoriteButton from "./ui/FavoriteButton";
import { useSearch } from "./ClientLayout";

export default function Home() {
  const { searchQuery } = useSearch();
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async (page, query = "", append = false) => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/wallpapers?page=${page}${
        query ? `&q=${encodeURIComponent(query)}` : ""
      }`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setImages((prev) => (append ? [...prev, ...data] : data));
      setHasMore(data.length === 12);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load wallpapers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset and search when query changes
  useEffect(() => {
    setCurrentPage(0);
    setImages([]); // Clear previous results
    fetchImages(0, searchQuery);
  }, [searchQuery]);

  // Load more pages
  useEffect(() => {
    if (currentPage > 0) {
      fetchImages(currentPage, searchQuery, true);
    }
  }, [currentPage]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(0);
    fetchImages(0, searchQuery);
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename || "wallpaper.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: open in new tab
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-border p-8 md:p-12">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary">
            My <span className="text-accent">Wallpapers</span>
          </h1>
          <p className="text-muted text-lg mt-3 max-w-xl">
            {searchQuery
              ? `Found wallpapers matching "${searchQuery}"`
              : "Browse the best high-resolution backgrounds curated for you."}
          </p>
          {images.length > 0 && (
            <p className="text-muted text-sm mt-2">
              Showing {images.length} wallpapers
            </p>
          )}
        </div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Loading State */}
      {loading && images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-accent border-t-transparent"></div>
          <p className="mt-4 text-muted font-medium">Loading wallpapers...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
          <p className="text-destructive font-medium">{error}</p>
          <button
            onClick={() => fetchImages(currentPage, searchQuery)}
            className="mt-3 px-4 py-2 bg-destructive text-white rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      )}

      {/* Content */}
      {!error && (
        <>
          {/* Image Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {images.map((img, index) => (
                <div
                  key={img.fileId || index}
                  className="group relative rounded-xl overflow-hidden shadow-sm border border-border 
                   hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] 
                   transition-all duration-300 ease-out cursor-pointer bg-surface"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.name || "Wallpaper image"}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading={index < 4 ? "eager" : "lazy"}
                      priority={index < 4}
                    />

                    <FavoriteButton
                      wallpaper={{
                        id: img.fileId || `home-${index}`,
                        url: img.url,
                        name: img.name,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(img.url, img.name);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors"
                      >
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-semibold text-primary truncate">
                      {img.name || "Untitled Wallpaper"}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      {img.downloads ? img.downloads.toLocaleString() : "0"}{" "}
                      downloads
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && images.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2z"
                  />
                </svg>
              </div>
              <p className="text-muted text-lg font-medium">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "No wallpapers found"}
              </p>
              <p className="text-muted text-sm mt-1">
                {searchQuery
                  ? "Try a different search term"
                  : "Check back later for new uploads"}
              </p>
            </div>
          )}

          {/* Load More / Back to Top */}
          {images.length > 0 && (
            <div className="flex flex-col items-center gap-4 pt-6 border-t border-border">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Wallpapers"
                  )}
                </button>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-muted text-sm">You've reached the end!</p>
                  <button
                    onClick={handleBackToTop}
                    className="px-4 py-2 bg-surface border border-border text-primary rounded-lg text-sm font-medium hover:bg-muted/10 transition-all flex items-center gap-2"
                  >
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
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                    Back to Top
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}