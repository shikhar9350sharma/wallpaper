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

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        role="complementary"
        aria-label="Sidebar"
        className={`fixed p-2 md:p-4 lg:static z-50 lg:z-auto top-16.75 left-0 h-full w-64 
                    transform transition-transform duration-300 ease-in-out
                    bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
                    text-white backdrop-blur-lg
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>

        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-[0.25em] mb-6">
          Explore
        </h2>

        <nav role="navigation">
          <ul className="space-y-2">
            {categories.map((cat) => {
              const currentPath = cat.slug === '' ? '/' : `/category/${cat.slug}`;
              const isActive = cat.slug === '' ? pathname === '/' : pathname === currentPath;

              return (
                <li key={cat.slug}>
                  <Link
                    href={currentPath}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                      ${isActive
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md font-semibold'
                        : 'text-gray-400 hover:bg-slate-700 hover:text-indigo-300'}
                    `}
                  >
                    <span
                      aria-hidden="true"
                      className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-125'}`}
                    >
                      {cat.emoji}
                    </span>
                    <span className="text-sm tracking-wide">{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Decorative Promo Card */}
        <div className="mt-12 p-5 bg-gradient-to-r from-purple-700 to-indigo-600 rounded-2xl text-white shadow-md md:block hidden">
          <p className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest">Community</p>
          <p className="text-xs mt-2 leading-relaxed opacity-90">
            Upload your 4K renders and get featured on the main grid.
          </p>
          <button className="mt-4 text-xs font-semibold bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
            Learn More
          </button>
        </div>
      </aside>
    </>
  );
}
