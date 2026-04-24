"use client";

import Image from "next/image";

export default function CategoryContent({ slug, wallpapers }) {
  const handleDownloadClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-border p-8 md:p-12">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
              {wallpapers.length} wallpapers
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black capitalize tracking-tight text-primary">
            {slug} <span className="text-accent">Wallpapers</span>
          </h1>
          <p className="text-muted text-lg mt-3 max-w-xl">
            Browse the best high-resolution {slug} backgrounds curated for you.
          </p>
        </div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Empty State */}
      {wallpapers.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2z" />
            </svg>
          </div>
          <p className="text-muted text-lg font-medium">No wallpapers found</p>
          <p className="text-muted text-sm mt-1">Check back later for new uploads</p>
        </div>
      )}

      {/* Image Grid */}
      {wallpapers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wallpapers.map((wallpaper, index) => (
            <div
              key={wallpaper.id}
              className="group relative rounded-xl overflow-hidden shadow-sm border border-border 
               hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] 
               transition-all duration-300 ease-out cursor-pointer bg-surface"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading={index < 4 ? "eager" : "lazy"}
                  priority={index < 4}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Download button on hover */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <a
                    href={wallpaper.image}
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
                <h2 className="text-sm font-semibold text-primary truncate">
                  {wallpaper.title}
                </h2>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {wallpaper.downloads.toLocaleString()} downloads
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}