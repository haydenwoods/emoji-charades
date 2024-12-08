import { DBPost } from "./db/post.js";
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
    postData?: DBPost;
  };
};

export type BackToMenuEvent = {
  type: "BACK_TO_MENU_EVENT";
};

// Request and Response
export type CreateRequest = {
  type: "CREATE_REQUEST";
  data: {
    topic: Topic;
    sentence: string;
  };
};
export type CreateResponse = {
  type: "CREATE_RESPONSE";
};

export type GuessRequest = {
  type: "GUESS_REQUEST";
  data: {
    guess: string;
  };
};
export type GuessResponse = {
  type: "GUESS_RESPONSE";
  data: {
    correct: boolean;
  };
};

export type Message =
  | MountedEvent
  | LoadedEvent
  | InitialDataEvent
  | BackToMenuEvent
  | CreateRequest
  | CreateResponse
  | GuessRequest
  | GuessResponse;
