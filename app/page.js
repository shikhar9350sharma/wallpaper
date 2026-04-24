import { Suspense } from "react";
import Home from "./components/Home";

export const metadata = {
  title: "WallpaperHub | Home",
  description: "Browse and discover trending 4K wallpapers.",
};

export default function Page() {
  return (
    <main className="p-2 md:p-6 min-h-screen bg-background text-primary">
      <Suspense fallback={<div className="p-10 text-muted">Loading wallpapers...</div>}>
        <Home />
      </Suspense>
    </main>
  );
}
