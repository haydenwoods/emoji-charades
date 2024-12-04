export enum Category {
  MOVIE,
  TV_SHOW,
  VIDEO_GAME,
  BOOK,
}

export type CategoryData = {
  name: string;
  emoji: string;
  color: "blue" | "orange" | "red" | "emerald";
};
