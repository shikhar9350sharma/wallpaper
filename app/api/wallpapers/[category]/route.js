// app/api/wallpapers/[category]/route.js
import imagekit from "@/app/lib/imagekit";

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

    const limit = 12;
    const skip = page * limit;

    const files = await imagekit.listFiles({
      path: `/Wallpaper/${category}`,
      limit,
      skip,
    });

    // Map to the exact shape CategoryContent expects
    const wallpapers = files.map((file, index) => ({
      id: file.fileId || `img-${skip + index}`,
      title: file.customMetadata?.name || file.name?.replace(/\.[^/.]+$/, "") || "Untitled Wallpaper",
      image: file.url,
      downloads: file.customMetadata?.downloads || Math.floor(Math.random() * 50000),
    }));

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