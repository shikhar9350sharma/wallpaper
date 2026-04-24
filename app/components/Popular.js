"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Popular = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/wallpapers?page=${page}`);
      const data = await response.json();
      setImages(data);
      setHasMore(data.length === 12);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasMore && !loading) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !loading) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-black capitalize tracking-tight text-primary">
          Popular <span className="text-accent">Wallpapers</span>
        </h1>
        <p className="text-muted mt-2">
          Browse the most popular high-resolution backgrounds.
        </p>
      </header>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-ring"></div>
          <p className="mt-2 text-muted">Loading wallpapers...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <div
                key={img.fileId}
                className="group relative rounded-xl overflow-hidden shadow-md border border-border 
                           hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] 
                           transition-all duration-300 ease-out"
              >
                <Image
                  src={img.url}
                  alt={img.name}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || loading}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg disabled:bg-muted disabled:cursor-not-allowed hover:opacity-90 transition-colors"
            >
              Previous
            </button>

            <span className="text-muted">
              Page {currentPage + 1}
            </span>

            <button
              onClick={handleNextPage}
              disabled={!hasMore || loading}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg disabled:bg-muted disabled:cursor-not-allowed hover:opacity-90 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Popular;
