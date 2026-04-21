import "./globals.css";
import Link from 'next/link';
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wallpaper Haven",
  description: "High-quality 4K wallpapers for your desktop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          {/* HEADER remains the same */}
          <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <div className="text-xl font-bold tracking-tight text-blue-600">
                WALLPAPER<span className="text-gray-900">HUB</span>
              </div>
              <nav className="hidden md:flex gap-6 font-medium">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <Link href="/popular" className="hover:text-blue-600">Popular</Link>
                <Link href="/new" className="hover:text-blue-600">New</Link>
              </nav>
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Search wallpapers..." 
                  className="hidden sm:block px-4 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700">
                  Upload
                </button>
              </div>
            </div>
          </header>

          <div className="flex flex-1 container mx-auto">
            <Sidebar /> 
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}