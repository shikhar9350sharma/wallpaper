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
    console.error("ImageKit Category API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch category wallpapers", details: error.message }),
      { status: 500 }
    );
  }
}