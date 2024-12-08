import { DBPost } from "./db/post.js";
import { DBUser } from "./db/user.js";
import { Topic } from "./topic.js";

// Events
export type MountedEvent = {
  type: "MOUNTED_EVENT";
};

export type LoadedEvent = {
  type: "LOADED_EVENT";
};

export type InitialDataEvent = {
  type: "INITIAL_DATA_EVENT";
  data: {
    user?: {
      id: string;
      username: string;
    };
    dbUser?: DBUser;
    dbPost?: DBPost;
  };
};

// Request and Response
export type CreateRequest = {
  type: "CREATE_REQUEST";
  data: {
    topic: Topic;
    emojis: string[];
  };
};
export type CreateResponse = {
  type: "CREATE_RESPONSE";
};

export type GuessRequest = {
  type: "GUESS_REQUEST";
  data: {
    input: string;
  };
};
export type GuessResponse = {
  type: "GUESS_RESPONSE";
};

export type Message =
  | MountedEvent
  | LoadedEvent
  | InitialDataEvent
  | CreateRequest
  | CreateResponse
  | GuessRequest
  | GuessResponse;
