import { Context } from "@devvit/public-api";

export class Service {
  readonly ui: Context["ui"];
  readonly reddit: Context["reddit"];

  constructor(context: Context) {
    this.ui = context.ui;
    this.reddit = context.reddit;
  }
}
