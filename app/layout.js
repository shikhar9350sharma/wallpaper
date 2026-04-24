// app/layout.js (Server Component)
import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wallpaper Haven | 4K Wallpapers",
  description: "High-quality 4K wallpapers for your desktop, gaming, and mobile.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 text-slate-900 antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
