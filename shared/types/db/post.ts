import { Topic } from "../topic.js";
import { Timestamped, UserCreated } from "./index.js";

export type DBPost = {
  id: string;
  topic: Topic;
  clue: string[];
} & UserCreated &
  Timestamped;