"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';

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
        className={`fixed p-2 md:p-4 lg:static z-50 lg:z-auto top-16 left-0 min-h-screen w-64 
                    transform transition-transform duration-300 ease-in-out
                    bg-surface text-primary backdrop-blur-lg
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Close button for mobile */}
        <button
          className=" absolute top-3 right-4 lg:hidden text-muted hover:text-primary"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
        <div className='mt-8 mb-3.75 md:mt-2 md:mb-6 flex items-center justify-between'>
          <h2 className="text-sm font-semibold text-muted uppercase tracking-[0.25em]">
            Explore
          </h2>
          <div className='lg:hidden'>
            <ThemeToggle className='hidden' />
          </div>
        </div>

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
                        ? 'bg-accent text-accent-foreground shadow-md font-semibold'
                        : 'text-muted hover:bg-muted/20 hover:text-accent'}
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
        <div className="mt-12 p-5 bg-accent rounded-2xl text-accent-foreground shadow-md md:block hidden">
          <p className="text-[11px] font-bold text-ring uppercase tracking-widest">Community</p>
          <p className="text-xs mt-2 leading-relaxed opacity-90">
            Upload your 4K renders and get featured on the main grid.
          </p>
          <button className="mt-4 text-xs font-semibold bg-surface text-primary px-4 py-2 rounded-lg hover:bg-muted/20 transition-colors">
            Learn More
          </button>
        </div>

      </aside>
    </>
  );
}
