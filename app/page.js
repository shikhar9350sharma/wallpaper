import { Suspense } from "react";
import Home from "./components/Home";

export const metadata = {
  title: "WallpaperHub | Home",
  description: "Browse and discover trending 4K wallpapers.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
      <Suspense fallback={<div className="p-10 text-slate-500">Loading wallpapers...</div>}>
        <Home />
      </Suspense>
    </main>
  );
}
