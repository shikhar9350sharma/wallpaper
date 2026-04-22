import { notFound } from "next/navigation";
import Image from "next/image";

const categories = ["cars", "gaming", "anime"];

const wallpapers = {
  cars: [
    { id: 1, title: "Sports Car", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/46.jpg", downloads: 1234 },
    { id: 2, title: "Luxury Sedan", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/44.jpg", downloads: 987 },
  ],
  gaming: [
    { id: 3, title: "Cyberpunk City", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/1.jpeg", downloads: 2345 },
    { id: 4, title: "Fantasy Landscape", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/44.jpg", downloads: 1567 },
  ],
  anime: [
    { id: 5, title: "Anime Character", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/46.jpg", downloads: 3456 },
    { id: 6, title: "Anime Scene", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/49.jpg", downloads: 2109 },
  ],
};

export default function CategoryPage({ params }) {
  const { slug } = params;

  if (!categories.includes(slug)) {
    notFound();
  }

  const categoryWallpapers = wallpapers[slug] || [];

  return (
    <section className="p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-black capitalize tracking-tight text-slate-900">
          {slug} <span className="text-blue-600">Wallpapers</span>
        </h1>
        <p className="text-slate-500 mt-2">
          Browse the best high-resolution {slug} backgrounds.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryWallpapers.map((wallpaper, index) => (
          <div
            key={wallpaper.id}
            className="group bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={wallpaper.image}
                alt={wallpaper.title}
                width={400}
                height={250}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading={index === 0 ? "eager" : "lazy"}
                priority={index === 0}
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-800">{wallpaper.title}</h2>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-slate-500">
                  {wallpaper.downloads.toLocaleString()} downloads
                </span>
                <a
                  href={wallpaper.image}
                  download
                  className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
