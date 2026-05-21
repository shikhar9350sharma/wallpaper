import { getWallpapersByCategory } from "../../../lib/wallpaperService";

export async function GET(req, { params }) {
  try {
    const { category } = await params;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0", 10);

    if (isNaN(page) || page < 0) {
      return new Response(
        JSON.stringify({ error: "Invalid page number" }),
        { status: 400 }
      );
    }

    const wallpapers = await getWallpapersByCategory(category, page);

    if (!wallpapers) {
      return new Response(
        JSON.stringify({ error: "Category not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(wallpapers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    // Log full error server-side for debugging
    console.error("ImageKit Category API Error:", error);
    
    // Send generic error to client — never expose internal details
    return new Response(
      JSON.stringify({ error: "Failed to fetch category wallpapers. Please try again later." }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}