import imagekit from "./imagekit";

const CATEGORIES = [
  "nature", "abstract", "minimal", "dark", 
  "anime", "cars", "space", "city", "gaming"
];

export function getCategories() {
  return CATEGORIES;
}

export async function getWallpapersByCategory(category, page = 0) {
  if (!CATEGORIES.includes(category)) {
    return null; // Will trigger notFound()
  }

  const limit = 12;
  const skip = page * limit;

  const files = await imagekit.listFiles({
    path: `/Wallpaper/${category}`,
    limit,
    skip,
  });

  return files.map((file, index) => ({
    id: file.fileId || `img-${skip + index}`,
    title: file.customMetadata?.name || file.name?.replace(/\.[^/.]+$/, "") || "Untitled Wallpaper",
    image: file.url,
    downloads: file.customMetadata?.downloads || Math.floor(Math.random() * 50000),
  }));
}

export async function getAllWallpapers(page = 0, query = "") {
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

  return filteredFiles.map((file, index) => ({
    fileId: file.fileId || `img-${skip + index}`,
    url: file.url,
    name: file.customMetadata?.name || file.name?.replace(/\.[^/.]+$/, "") || "Untitled Wallpaper",
    resolution: file.customMetadata?.resolution || `${file.width || 1920}x${file.height || 1080}`,
    downloads: file.customMetadata?.downloads || Math.floor(Math.random() * 50000),
    date: new Date(file.createdAt).toLocaleDateString(),
    size: file.size ? (file.size / 1024 / 1024).toFixed(2) + " MB" : null,
  }));
}