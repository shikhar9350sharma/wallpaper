import { notFound } from "next/navigation";
import ClientLayout from "../../components/ClientLayout";
import CategoryContent from "../../components/CategoryContent";

const categories = ["cars", "gaming", "anime", "minimal", "nature"];

const wallpapers = {
  cars: [
    { id: 1, title: "Sports Car", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/46.jpg", downloads: 1234 },
    { id: 2, title: "Luxury Sedan", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/44.jpg", downloads: 94327 },
  ],
  gaming: [
    { id: 3, title: "Cyberpunk City", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/1.jpeg", downloads: 2345 },
    { id: 4, title: "Fantasy Landscape", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/44.jpg", downloads: 1267 },
  ],
  anime: [
    { id: 5, title: "Anime Character", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/46.jpg", downloads: 3456 },
    { id: 6, title: "Anime Scene", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/23.jpg", downloads: 213409 },
  ],
  minimal: [
    { id: 7, title: "A Boy", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/32.jpg?updatedAt=1776844234556", downloads: 54356 },
    { id: 8, title: "The Journey", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/43.jpg?updatedAt=1776844205634", downloads: 334109 },
  ],
  nature: [
    { id: 9, title: "A Boy", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/37.jpg", downloads: 3456 },
    { id: 10, title: "The Journey", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/5.png", downloads: 34309 },
    { id: 11, title: "The House", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/4.png", downloads: 54309 },
  ],
};

export async function generateStaticParams() {
  return categories.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  if (!categories.includes(slug)) {
    notFound();
  }

  const categoryWallpapers = wallpapers[slug] || [];

  return (
    
    <CategoryContent slug={slug} wallpapers={categoryWallpapers} />
    
  );
}