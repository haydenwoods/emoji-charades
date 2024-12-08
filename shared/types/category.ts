export enum Category {
  MOVIE,
  TV_SHOW,
  VIDEO_GAME,
  BOOK,
  CHARACTER,
  FAMOUS_PERSON,
}

export type CategoryData = {
  name: string;
  emoji: string;
  color: "blue" | "orange" | "red" | "emerald" | "purple" | "yellow" | "indigo" | "amber";
};
