import { Topic } from "./topic.js";

// Events
export type MountedEvent = {
  type: "MOUNTED_EVENT";
};

export type UserDataEvent = {
  type: "USER_DATA_EVENT";
  data: {
    user?: {
      id: string;
      username: string;
    };
  };
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
  data: {};
};

export type Message = MountedEvent | UserDataEvent | CreateRequest | CreateResponse;
