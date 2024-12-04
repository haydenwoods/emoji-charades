import allEmojis from "emojilib";

import { Emoji } from "../types/emoji";

export const EMOJIS: Emoji[] = Object.entries(allEmojis).map(([value, searchTerms]) => ({
  value,
  searchTerms,
}));
