import Link from 'next/link';

const categories = [
  { name: 'Cars', slug: 'cars', emoji: '🏎️' },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮' },
  { name: 'Anime', slug: 'anime', emoji: '🎎' },
  // Add more categories as needed
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 p-6 border-r">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Categories
      </h2>
      <ul className="space-y-3 font-medium">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link href={`/category/${cat.slug}`} className="flex items-center gap-2 hover:text-blue-600">
              {cat.emoji} {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}