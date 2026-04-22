import imagekit from "@/app/lib/imagekit";

export async function GET() {
  try {
    const files = await imagekit.listFiles({
      path: "/Wallpaper",   // folder name
      limit: 10,            // max files per request
    });

    return new Response(JSON.stringify(files), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
