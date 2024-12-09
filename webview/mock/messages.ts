import { TOPICS } from "@shared/constants/topics";

import { Message, InitialDataEvent } from "@shared/types/message";

const sendMessage = (message: Message) => {
  window.postMessage({
    type: "devvit-message",
    data: {
      message,
    },
  });
};

const timeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const mockMessages = () => {
  window.addEventListener("message", async (event) => {
    const message = event.data as Message;

    switch (message.type) {
      case "MOUNTED_EVENT":
        const now = new Date().toISOString();
        const user: InitialDataEvent["data"]["user"] = {
          id: "t2_12345",
          username: "Username",
        };
        const topic = TOPICS.find(({ name }) => name === "Parks and Recreation") ?? TOPICS[0];

        sendMessage({
          type: "INITIAL_DATA_EVENT",
          data: {
            user,
            dbUser: {
              id: user.id,
              playedPosts: [],
              createdAt: now,
            },
            // dbPost: {
            //   id: "t3_12345",
            //   topic,
            //   clue: ["📺", "🛝", "➕", "🏃"],
            //   createdBy: user.id,
            //   createdAt: now,
            // },
          },
        });
        break;
      case "CREATE_REQUEST":
        await timeout(2000);
        sendMessage({
          type: "CREATE_RESPONSE",
        });
        break;
    }
  });
};
