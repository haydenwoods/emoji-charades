import { Category } from "./category.js";

export type Topic = {
  name: string;
  alternateNames?: string[];
  category: Category;
};
