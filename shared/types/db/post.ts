import { Topic } from "../topic.js";
import { Timestamped, UserCreated } from "./index.js";

export type DBPost = {
  topic: Topic;
  sentence: string;
} & UserCreated &
  Timestamped;
