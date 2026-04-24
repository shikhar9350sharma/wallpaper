import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./components/ClientLayout";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wallpaper Haven | 4K Wallpapers",
  description: "High-quality 4K wallpapers for your desktop, gaming, and mobile.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
