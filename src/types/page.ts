import { Devvit } from "@devvit/public-api";

export enum Page {
  MENU,
  MENU_LEADERBOARD,
  MENU_SETTINGS,
  MENU_HELP,
  CREATE,
  GUESS,
}

export type State = {
  page: Page;
  setPage: (page: Page) => void;
}

export type PageComponent = (context: Devvit.Context, state: State) => JSX.Element