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
  {
    name: "Titanic",
    category: Category.MOVIE,
  },
  {
    name: "E.T. The Extra-Terrestrial",
    alternateNames: ["ET", "E.T.", "ET The Extra Terrestrial"],
    category: Category.MOVIE,
  },
  {
    name: "The Wizard of Oz",
    alternateNames: ["Wizard of Oz"],
    category: Category.MOVIE,
  },
  {
    name: "Star Wars",
    category: Category.MOVIE,
  },
  {
    name: "The Lord of the Rings",
    alternateNames: ["Lord of the Rings"],
    category: Category.MOVIE,
  },
  {
    name: "The Lion King",
    alternateNames: ["Lion King"],
    category: Category.MOVIE,
  },
  {
    name: "Jurassic Park",
    category: Category.MOVIE,
  },
  {
    name: "The Dark Knight",
    category: Category.MOVIE,
  },
  {
    name: "Pirates of the Caribbean",
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
  {
    name: "The Office",
    category: Category.TV_SHOW,
  },
  {
    name: "Mr Robot",
    category: Category.TV_SHOW,
  },
  {
    name: "Breaking Bad",
    category: Category.TV_SHOW,
  },
  {
    name: "Better Call Saul",
    category: Category.TV_SHOW,
  },
  {
    name: "Lost",
    category: Category.TV_SHOW,
  },
  {
    name: "Game of Thrones",
    category: Category.TV_SHOW,
  },
  {
    name: "Arcane",
    category: Category.TV_SHOW,
  },
  {
    name: "Stranger Things",
    category: Category.TV_SHOW,
  },
  {
    name: "The Big Bang Theory",
    alternateNames: ["Big Bang Theory"],
    category: Category.TV_SHOW,
  },
  {
    name: "The Simpsons",
    alternateNames: ["Simpsons"],
    category: Category.TV_SHOW,
  },
  {
    name: "How I Met Your Mother",
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
  {
    name: "Counter-Strike",
    alternateNames: ["Counter Strike", "CS", "CS2", "CSGO", "Global Offensive"],
    category: Category.VIDEO_GAME,
  },
  {
    name: "Call of Duty",
    alternateNames: ["COD"],
    category: Category.VIDEO_GAME,
  },
  {
    name: "Super Smash Bros",
    category: Category.VIDEO_GAME,
  },
  {
    name: "Mario Kart",
    category: Category.VIDEO_GAME,
  },
  {
    name: "Red Dead Redemption",
    alternateNames: ["RDR", "RDR2"],
    category: Category.VIDEO_GAME,
  },
  {
    name: "The Legend of Zelda",
    category: Category.VIDEO_GAME,
  },
  {
    name: "Portal",
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
  {
    name: "Indiana Jones",
    category: Category.CHARACTER,
  },
  {
    name: "James Bond",
    category: Category.CHARACTER,
  },
  {
    name: "The Joker",
    category: Category.CHARACTER,
  },
  {
    name: "Batman",
    category: Category.CHARACTER,
  },
  {
    name: "Superman",
    category: Category.CHARACTER,
  },
  {
    name: "Gandalf",
    category: Category.CHARACTER,
  },
  {
    name: "Mario",
    category: Category.CHARACTER,
  },
  {
    name: "Iron Man",
    category: Category.CHARACTER,
  },
  {
    name: "Spider-Man",
    alternateNames: ["Spiderman"],
    category: Category.CHARACTER,
  },
  {
    name: "Harry Potter",
    category: Category.CHARACTER,
  },
  {
    name: "Katniss Everdeen",
    alternateNames: ["Katniss"],
    category: Category.CHARACTER,
  },
  {
    name: "Yoda",
    category: Category.CHARACTER,
  },
  {
    name: "Ron Burgundy",
    category: Category.CHARACTER,
  },
  {
    name: "Captain Jack Sparrow",
    alternateNames: ["Jack Sparrow"],
    category: Category.CHARACTER,
  },
  // Famous People
  {
    name: "Tom Hanks",
    category: Category.FAMOUS_PERSON,
  },
  {
    name: "Taylor Swift",
    category: Category.FAMOUS_PERSON,
  },
  {
    name: "Bill Gates",
    category: Category.FAMOUS_PERSON,
  },
  {
    name: "Barack Obama",
    category: Category.FAMOUS_PERSON,
  },
  {
    name: "Lionel Messi",
    category: Category.FAMOUS_PERSON,
  },
  {
    name: "Leonardo DiCaprio",
    category: Category.FAMOUS_PERSON,
  },
  // Phrase
  {
    name: "Cost an arm and a leg",
    category: Category.PHRASE,
  },
  {
    name: "Barking up the wrong tree",
    category: Category.PHRASE,
  },
  {
    name: "Beat around the bush",
    category: Category.PHRASE,
  },
  {
    name: "Break the ice",
    category: Category.PHRASE,
  },
  {
    name: "Hold your horses",
    category: Category.PHRASE,
  },
  {
    name: "See eye to eye",
    category: Category.PHRASE,
  },
  {
    name: "Curiosity killed the cat",
    category: Category.PHRASE,
  },
  {
    name: "Cry over spilt milk",
    category: Category.PHRASE,
  },
];
