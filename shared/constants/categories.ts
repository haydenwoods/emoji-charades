import { Category, CategoryData } from "../types/category.js";

export const CATEGORY_DATA: Record<Category, CategoryData> = {
  [Category.MOVIE]: {
    name: "Movie",
    emoji: "🎬",
    color: "emerald",
  },
  [Category.TV_SHOW]: {
    name: "TV Show",
    emoji: "📺",
    color: "orange",
  },
  [Category.VIDEO_GAME]: {
    name: "Video Game",
    emoji: "🎮",
    color: "red",
  },
  [Category.BOOK]: {
    name: "Book",
    emoji: "📖",
    color: "blue",
  },
};
