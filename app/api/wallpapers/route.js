import imagekit from "@/app/lib/imagekit";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "0", 10); // default page 0
    const limit = 12; // images per page
    const skip = page * limit;

    const files = await imagekit.listFiles({
      path: "/Wallpaper",
      limit,
      skip,
    });

    return new Response(JSON.stringify(files), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
