import { TopicCategory } from "@shared/types/db/topic-category.js";

export const TOPIC_CATEGORIES: Omit<TopicCategory, "createdAt">[] = [
  {
    name: "Movie",
    emoji: "🎬",
    color: "amber",
  },
  {
    name: "TV Show",
    emoji: "📺",
    color: "orange",
  },
  {
    name: "Video Game",
    emoji: "🎮",
    color: "red",
  },
  {
    name: "Book",
    emoji: "📖",
    color: "blue",
  },
  {
    name: "Character",
    emoji: "👤",
    color: "indigo",
  },
  {
    name: "Famous Person",
    emoji: "⭐️",
    color: "yellow",
  },
  {
    name: "Idiom",
    emoji: "💬",
    color: "purple",
  },
];
