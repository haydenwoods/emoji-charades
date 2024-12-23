import { Topic } from "@shared/types/db/topic.js";

export const DEFAULT_TOPICS: Omit<Topic, "createdAt">[] = [
  // Movies
  {
    name: "There Will be Blood",
    category: "Movie",
  },
  {
    name: "Dune",
    category: "Movie",
  },
  {
    name: "In Bruges",
    category: "Movie",
  },
  {
    name: "The Wolf of Wall Street",
    category: "Movie",
  },
  {
    name: "Fight Club",
    category: "Movie",
  },
  {
    name: "Alien",
    category: "Movie",
  },
  {
    name: "The Godfather",
    category: "Movie",
  },
  {
    name: "Goodfellas",
    category: "Movie",
  },
  {
    name: "Saving Private Ryan",
    category: "Movie",
  },
  {
    name: "The Truman Show",
    category: "Movie",
  },
  {
    name: "Die Hard",
    category: "Movie",
  },
  {
    name: "Ferris Bueller's Day Off",
    category: "Movie",
  },
  {
    name: "Titanic",
    category: "Movie",
  },
  {
    name: "E.T. The Extra-Terrestrial",
    alternateNames: ["ET", "E.T.", "ET The Extra Terrestrial"],
    category: "Movie",
  },
  {
    name: "The Wizard of Oz",
    alternateNames: ["Wizard of Oz"],
    category: "Movie",
  },
  {
    name: "Star Wars",
    category: "Movie",
  },
  {
    name: "The Lord of the Rings",
    alternateNames: ["Lord of the Rings"],
    category: "Movie",
  },
  {
    name: "The Lion King",
    alternateNames: ["Lion King"],
    category: "Movie",
  },
  {
    name: "Jurassic Park",
    category: "Movie",
  },
  {
    name: "The Dark Knight",
    category: "Movie",
  },
  {
    name: "Pirates of the Caribbean",
    category: "Movie",
  },
  // TV Shows
  {
    name: "Silicon Valley",
    category: "TV Show",
  },
  {
    name: "Parks and Recreation",
    alternateNames: ["Parks and Rec", "P and R", "P&R"],
    category: "TV Show",
  },
  {
    name: "The Office",
    category: "TV Show",
  },
  {
    name: "Mr Robot",
    category: "TV Show",
  },
  {
    name: "Breaking Bad",
    category: "TV Show",
  },
  {
    name: "Better Call Saul",
    category: "TV Show",
  },
  {
    name: "Lost",
    category: "TV Show",
  },
  {
    name: "Game of Thrones",
    category: "TV Show",
  },
  {
    name: "Arcane",
    category: "TV Show",
  },
  {
    name: "Stranger Things",
    category: "TV Show",
  },
  {
    name: "The Big Bang Theory",
    alternateNames: ["Big Bang Theory"],
    category: "TV Show",
  },
  {
    name: "The Simpsons",
    alternateNames: ["Simpsons"],
    category: "TV Show",
  },
  {
    name: "How I Met Your Mother",
    category: "TV Show",
  },
  // Video Games
  {
    name: "Farming Simulator",
    alternateNames: ["Farming Sim"],
    category: "Video Game",
  },
  {
    name: "Grand Theft Auto",
    alternateNames: ["GTA"],
    category: "Video Game",
  },
  {
    name: "Counter-Strike",
    alternateNames: ["Counter Strike", "CS", "CS2", "CSGO", "Global Offensive"],
    category: "Video Game",
  },
  {
    name: "Call of Duty",
    alternateNames: ["COD"],
    category: "Video Game",
  },
  {
    name: "Super Smash Bros",
    category: "Video Game",
  },
  {
    name: "Mario Kart",
    category: "Video Game",
  },
  {
    name: "Red Dead Redemption",
    alternateNames: ["RDR", "RDR2"],
    category: "Video Game",
  },
  {
    name: "The Legend of Zelda",
    category: "Video Game",
  },
  {
    name: "Portal",
    category: "Video Game",
  },
  // Books
  {
    name: "Life of Pi",
    category: "Book",
  },
  {
    name: "Moby Dick",
    category: "Book",
  },
  // Characters
  {
    name: "Darth Vader",
    category: "Character",
  },
  {
    name: "Indiana Jones",
    category: "Character",
  },
  {
    name: "James Bond",
    category: "Character",
  },
  {
    name: "The Joker",
    category: "Character",
  },
  {
    name: "Batman",
    category: "Character",
  },
  {
    name: "Superman",
    category: "Character",
  },
  {
    name: "Gandalf",
    category: "Character",
  },
  {
    name: "Mario",
    category: "Character",
  },
  {
    name: "Iron Man",
    category: "Character",
  },
  {
    name: "Spider-Man",
    alternateNames: ["Spiderman"],
    category: "Character",
  },
  {
    name: "Harry Potter",
    category: "Character",
  },
  {
    name: "Katniss Everdeen",
    alternateNames: ["Katniss"],
    category: "Character",
  },
  {
    name: "Yoda",
    category: "Character",
  },
  {
    name: "Ron Burgundy",
    category: "Character",
  },
  {
    name: "Captain Jack Sparrow",
    alternateNames: ["Jack Sparrow"],
    category: "Character",
  },
  // Famous People
  {
    name: "Tom Hanks",
    category: "Famous Person",
  },
  {
    name: "Taylor Swift",
    category: "Famous Person",
  },
  {
    name: "Bill Gates",
    category: "Famous Person",
  },
  {
    name: "Barack Obama",
    category: "Famous Person",
  },
  {
    name: "Lionel Messi",
    category: "Famous Person",
  },
  {
    name: "Leonardo DiCaprio",
    category: "Famous Person",
  },
  // Phrase
  {
    name: "Cost an arm and a leg",
    category: "Idiom",
  },
  {
    name: "Barking up the wrong tree",
    category: "Idiom",
  },
  {
    name: "Beat around the bush",
    category: "Idiom",
  },
  {
    name: "Break the ice",
    category: "Idiom",
  },
  {
    name: "Hold your horses",
    category: "Idiom",
  },
  {
    name: "See eye to eye",
    category: "Idiom",
  },
  {
    name: "Curiosity killed the cat",
    category: "Idiom",
  },
  {
    name: "Cry over spilt milk",
    category: "Idiom",
  },
];
