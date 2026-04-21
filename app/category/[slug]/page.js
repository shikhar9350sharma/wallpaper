import { notFound } from 'next/navigation';

const categories = ['cars', 'gaming', 'anime'];  // Match slugs from Sidebar

export default function CategoryPage({ params }) {
  const { slug } = params;
  if (!categories.includes(slug)) {
    notFound();  // Show 404 for invalid categories
  }
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">{slug} Wallpapers</h1>
      {/* Add category-specific content here */}
    </div>
  );
}