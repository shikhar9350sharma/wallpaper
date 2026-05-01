
import { getAllWallpapers } from "../../lib/wallpaperService";


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const query = searchParams.get("q") || "";

    if (isNaN(page) || page < 0) {
      return new Response(
        JSON.stringify({ error: "Invalid page number" }),
        { status: 400 }
      );
    }

    const wallpapers = await getAllWallpapers(page, query);

    return new Response(JSON.stringify(wallpapers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("ImageKit API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch wallpapers", details: error.message }),
      { status: 500 }
    );
  }
}