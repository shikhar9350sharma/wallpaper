import imagekit from "@/app/lib/imagekit";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    
    // Validate page number
    if (isNaN(page) || page < 0) {
      return new Response(
        JSON.stringify({ error: "Invalid page number" }),
        { status: 400 }
      );
    }

    const limit = 12;
    const skip = page * limit;

    const files = await imagekit.listFiles({
      path: "/Wallpaper",
      limit,
      skip,
    });

    // Map to consistent format for your frontend
    const wallpapers = files.map((file, index) => ({
      fileId: file.fileId || `img-${skip + index}`,
      url: file.url,
      name: file.customMetadata?.name || file.name?.replace(/\.[^/.]+$/, "") || "Untitled",
      resolution: file.customMetadata?.resolution || `${file.width}x${file.height}`,
      downloads: file.customMetadata?.downloads || Math.floor(Math.random() * 50000),
      date: new Date(file.createdAt).toLocaleDateString(),
      size: (file.size / 1024 / 1024).toFixed(2) + " MB", // optional
    }));

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