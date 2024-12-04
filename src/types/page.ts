import { Devvit } from "@devvit/public-api";

export type App = {
  showWebview: boolean;
  setShowWebview: (value: boolean) => void;
}

export type PageComponent = (props: { context: Devvit.Context, app: App }) => JSX.Element