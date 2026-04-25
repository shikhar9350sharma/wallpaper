import imagekit from "@/app/lib/imagekit";

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

    const limit = 12;
    const skip = page * limit;

    const options = {
      path: "/Wallpaper",
      limit: query.trim() ? 100 : limit,
      skip: query.trim() ? 0 : skip,
    };

    const files = await imagekit.listFiles(options);

    let filteredFiles = files;

    if (query.trim()) {
      const searchTerm = query.trim().toLowerCase();
      filteredFiles = files.filter((file) => {
        const fileName = (file.name || "").toLowerCase();
        const customName = (file.customMetadata?.name || "").toLowerCase();
        return fileName.includes(searchTerm) || customName.includes(searchTerm);
      });
      filteredFiles = filteredFiles.slice(skip, skip + limit);
    }

    const wallpapers = filteredFiles.map((file, index) => ({
      fileId: file.fileId || `img-${skip + index}`,
      url: file.url,
      name: file.customMetadata?.name || file.name?.replace(/\.[^/.]+$/, "") || "Untitled Wallpaper",
      resolution: file.customMetadata?.resolution || `${file.width || 1920}x${file.height || 1080}`,
      downloads: file.customMetadata?.downloads || Math.floor(Math.random() * 50000),
      date: new Date(file.createdAt).toLocaleDateString(),
      size: file.size ? (file.size / 1024 / 1024).toFixed(2) + " MB" : null,
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