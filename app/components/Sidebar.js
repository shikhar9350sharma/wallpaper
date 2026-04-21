"use client"; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { name: 'All Wallpapers', slug: '', emoji: '🖼️' },
  { name: 'Cars', slug: 'cars', emoji: '🏎️' },
  { name: 'Gaming', slug: 'gaming', emoji: '🎮' },
  { name: 'Anime', slug: 'anime', emoji: '🎎' },
  { name: 'Nature', slug: 'nature', emoji: '🌲' },
  { name: 'Minimal', slug: 'minimal', emoji: '🎨' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-[calc(100vh-64px)] sticky top-16 p-6 border-r bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white backdrop-blur-lg">
      {/* Section Title */}
      <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-[0.25em] mb-6">
        Explore
      </h2>
      
      <nav>
        <ul className="space-y-2">
          {categories.map((cat) => {
            const currentPath = cat.slug === '' ? '/' : `/category/${cat.slug}`;
            const isActive = pathname === currentPath;

            return (
              <li key={cat.slug}>
                <Link 
                  href={currentPath} 
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-400/40 font-semibold' 
                      : 'text-gray-400 hover:bg-slate-700 hover:text-indigo-300'}
                  `}
                >
                  <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-125'}`}>
                    {cat.emoji}
                  </span>
                  <span className="text-sm tracking-wide">
                    {cat.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Decorative Promo Card */}
      <div className="mt-12 p-5 bg-gradient-to-r from-purple-700 to-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
        <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest">Community</p>
        <p className="text-xs mt-2 leading-relaxed opacity-90">
          Upload your 4K renders and get featured on the main grid.
        </p>
        <button className="mt-4 text-xs font-semibold bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
          Learn More
        </button>
      </div>
    </aside>
  );
}
