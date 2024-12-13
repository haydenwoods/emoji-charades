import { Category } from "../types/category.js";

export const CATEGORY_TO_NAME: Record<Category, string> = {
  [Category.MOVIE]: "Movie",
  [Category.TV_SHOW]: "TV Show",
  [Category.VIDEO_GAME]: "Video Game",
  [Category.BOOK]: "Book",
  [Category.CHARACTER]: "Character",
  [Category.FAMOUS_PERSON]: "Famous Person",
  [Category.PHRASE]: "Phrase",
};

export const CATEGORY_TO_COLOR: Record<
  Category,
  "blue" | "orange" | "red" | "emerald" | "purple" | "yellow" | "indigo" | "amber"
> = {
  [Category.MOVIE]: "emerald",
  [Category.TV_SHOW]: "orange",
  [Category.VIDEO_GAME]: "red",
  [Category.BOOK]: "blue",
  [Category.CHARACTER]: "indigo",
  [Category.FAMOUS_PERSON]: "yellow",
  [Category.PHRASE]: "indigo",
};
