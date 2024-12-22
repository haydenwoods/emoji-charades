import { Timestamped } from "./index.js";

export const TOPIC_CATEGORY_COLORS = [
  "blue",
  "orange",
  "red",
  "emerald",
  "purple",
  "yellow",
  "indigo",
  "amber",
] as const;

export type TopicCategoryColor = (typeof TOPIC_CATEGORY_COLORS)[number];

export type TopicCategory = {
  name: string;
  emoji: string;
  color: TopicCategoryColor;
} & Timestamped;
