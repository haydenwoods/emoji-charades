import { CreateFlairTemplateOptions } from "@devvit/public-api";

export const PUZZLE_FLAIR: Omit<CreateFlairTemplateOptions, "subredditName"> = {
  text: "🤔 Puzzle",
  textColor: "dark",
  backgroundColor: "#fcd34d",
  modOnly: true,
  allowUserEdits: false,
};
