import { notFound } from "next/navigation";
import CategoryContent from "../../components/CategoryContent";

const categories = [
  "nature",
  "abstract",
  "minimal",
  "dark",
  "anime",
  "cars",
  "space",
  "city",
];

const wallpapers = {
  nature: [
    { id: 1, title: "Forest Morning", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/37.jpg", downloads: 12453 },
    { id: 2, title: "Mountain Lake", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/5.png", downloads: 8921 },
    { id: 3, title: "Sunset Valley", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/4.png", downloads: 15670 },
  ],
  abstract: [
    { id: 4, title: "Color Flow", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/1.jpeg", downloads: 3421 },
    { id: 5, title: "Geometric Waves", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/46.jpg", downloads: 5678 },
  ],
  minimal: [
    { id: 6, title: "Clean Lines", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/32.jpg?updatedAt=1776844234556", downloads: 9876 },
    { id: 7, title: "Soft Gradient", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/43.jpg?updatedAt=1776844205634", downloads: 7654 },
  ],
  dark: [
    { id: 8, title: "Midnight City", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/44.jpg", downloads: 23456 },
    { id: 9, title: "Dark Forest", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/23.jpg", downloads: 18765 },
  ],
  anime: [
    { id: 10, title: "Character Art", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/46.jpg", downloads: 45678 },
    { id: 11, title: "Anime Landscape", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/1.jpeg", downloads: 34567 },
  ],
  cars: [
    { id: 12, title: "Sports Car", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/46.jpg", downloads: 1234 },
    { id: 13, title: "Luxury Sedan", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/44.jpg", downloads: 94327 },
  ],
  space: [
    { id: 14, title: "Nebula", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/5.png", downloads: 67890 },
    { id: 15, title: "Galaxy View", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/4.png", downloads: 54321 },
  ],
  city: [
    { id: 16, title: "Tokyo Night", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/37.jpg", downloads: 8765 },
    { id: 17, title: "New York Skyline", image: "https://ik.imagekit.io/hopetoseeyouagain/Wallpaper/23.jpg", downloads: 7654 },
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