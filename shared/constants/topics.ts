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
  {
    name: "In Bruges",
    category: Category.MOVIE,
  },
  {
    name: "Blackberry",
    category: Category.MOVIE,
  },
  {
    name: "The Wolf of Wall Street",
    category: Category.MOVIE,
  },
  {
    name: "Fight Club",
    category: Category.MOVIE,
  },
  {
    name: "Alien",
    category: Category.MOVIE,
  },
  {
    name: "The Godfather",
    category: Category.MOVIE,
  },
  {
    name: "Goodfellas",
    category: Category.MOVIE,
  },
  {
    name: "Saving Private Ryan",
    category: Category.MOVIE,
  },
  {
    name: "The Truman Show",
    category: Category.MOVIE,
  },
  {
    name: "Die Hard",
    category: Category.MOVIE,
  },
  {
    name: "Ferris Bueller's Day Off",
    category: Category.MOVIE,
  },
  // TV Shows
  {
    name: "Silicon Valley",
    category: Category.TV_SHOW,
  },
  {
    name: "Parks and Recreation",
    alternateNames: ["Parks and Rec", "P and R", "P&R"],
    category: Category.TV_SHOW,
  },
  // Video Games
  {
    name: "Farming Simulator",
    alternateNames: ["Farming Sim"],
    category: Category.VIDEO_GAME,
  },
  {
    name: "Grand Theft Auto",
    alternateNames: ["GTA"],
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
  // Phrase
  {
    name: "Cost an arm and a leg",
    category: Category.PHRASE,
  },
];
