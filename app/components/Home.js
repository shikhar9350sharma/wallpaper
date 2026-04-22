"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
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
      // If we got fewer than 12 images, there are no more pages
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
    if (hasMore && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !loading) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <>
      <header className="mb-10">
        <h1 className="text-4xl font-black capitalize tracking-tight text-slate-900">
          My <span className="text-blue-600">Wallpapers</span>
        </h1>
        <p className="text-slate-500 mt-2">Browse the best high-resolution backgrounds.</p>
      </header>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-slate-500">Loading wallpapers...</p>
        </div>
      )}

      {!loading && (
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
        </>
      )}
    </>
  );
}
