import { Category } from "../types/category.js";

export const CATEGORY_TO_NAME: Record<Category, string> = {
  [Category.MOVIE]: "Movie",
  [Category.TV_SHOW]: "TV Show",
  [Category.VIDEO_GAME]: "Video Game",
  [Category.BOOK]: "Book",
};
