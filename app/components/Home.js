"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async (page, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/wallpapers?page=${page}`);
      const data = await response.json();

      // Append or replace depending on mode
      setImages(prev => (append ? [...prev, ...data] : data));

      // If fewer than 12 items, no more pages
      setHasMore(data.length === 12);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load wallpapers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasMore && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !loading) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchImages(nextPage, true); // append mode
    }
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-black capitalize tracking-tight text-slate-900">
          My <span className="text-blue-600">Wallpapers</span>
        </h1>
        <p className="text-slate-500 mt-2">
          Browse the best high-resolution backgrounds.
        </p>
      </header>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-slate-500">Loading wallpapers...</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mb-6">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <div
                key={img.fileId}
                className="group relative rounded-xl overflow-hidden shadow-md border border-slate-200 
                 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] 
                 transition-all duration-300 ease-out"
              >
                <Image
                  src={img.url}
                  alt={img.name || "Wallpaper image"}
                  width={400}
                  height={250}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading={index < 4 ? "eager" : "lazy"}
                  priority={index < 4}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Previous
            </button>

            <span className="text-slate-600">
              Page {currentPage + 1}
            </span>

            <button
              onClick={handleNextPage}
              disabled={!hasMore || loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>

          {/* Load More Option */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              disabled={!hasMore || loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
            >
              Load More
            </button>
          </div>
        </>
      )}
    </>
  );
}
