import { Category } from "@shared/types/category.js";

import { randomRange } from "@shared/utils/random.js";

export const getRandomCategory = (): Category => {
  const categories = Object.values(Category);
  const index = randomRange(0, categories.length);
  const category = categories[index] as Category;
  return category;
};
