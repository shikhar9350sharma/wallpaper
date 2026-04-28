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
  "gaming",
];

export async function generateStaticParams() {
  return categories.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  if (!categories.includes(slug)) {
    notFound();
  }

  // Fetch wallpapers from your category API
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/wallpapers/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  const categoryWallpapers = await res.json();

  return <CategoryContent slug={slug} wallpapers={categoryWallpapers} />;
}