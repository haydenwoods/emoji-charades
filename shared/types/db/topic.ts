import { Timestamped } from "./index.js";
import { TopicCategory } from "./topic-category.js";

export type Topic = {
  name: string;
  alternateNames?: string[];
  category: TopicCategory["name"];
} & Timestamped;
