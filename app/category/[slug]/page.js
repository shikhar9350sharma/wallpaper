import { notFound } from "next/navigation";
import CategoryContent from "../../components/CategoryContent";
import { getCategories, getWallpapersByCategory } from "../../lib/wallpaperService";


// Use shared categories from service
export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  // ✅ Fetch directly from ImageKit — no localhost HTTP call!
  const categoryWallpapers = await getWallpapersByCategory(slug);

  // getWallpapersByCategory returns null if category doesn't exist
  if (!categoryWallpapers) {
    notFound();
  }

  return <CategoryContent slug={slug} initialWallpapers={categoryWallpapers} />;
}