import { Topic } from "./topic.js";

export type PostData = {
  topic: Topic;
  sentence: string;
  createdBy: string;
};
