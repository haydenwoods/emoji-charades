import { Category } from "@shared/types/category.js";
import { Topic } from "@shared/types/topic.js";

export const TOPICS: Topic[] = [
  // Movies
  {
    name: "There Will be Blood",
    category: Category.MOVIE,
  },
  {
    name: "Dune",
    category: Category.MOVIE,
  },
  // TV Shows
  {
    name: "Silicon Valley",
    category: Category.TV_SHOW,
  },
  {
    name: "Parks and Recreation",
    category: Category.TV_SHOW,
  },
  // Video Games
  {
    name: "Farming Simulator",
    category: Category.VIDEO_GAME,
  },
  {
    name: "Grand Theft Auto",
    category: Category.VIDEO_GAME,
  },
  // Books
  {
    name: "Life of Pi",
    category: Category.BOOK,
  },
  {
    name: "Moby Dick",
    category: Category.BOOK,
  },
  // Characters
  {
    name: "Darth Vader",
    category: Category.CHARACTER,
  },
  // Famous People
  {
    name: "Tom Hanks",
    category: Category.FAMOUS_PERSON,
  },
];
