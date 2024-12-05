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

export const mockMessages = () => {
  window.addEventListener("message", (event) => {
    const message = event.data as Message;

    switch (message.type) {
      case "MOUNTED_EVENT":
        const user: InitialDataEvent["data"]["user"] = {
          id: "t2_12345",
          username: "Username",
        };
        const topic = TOPICS[0];

        sendMessage({
          type: "INITIAL_DATA_EVENT",
          data: {
            user,
            postData: {
              topicName: topic.name,
              topicCategory: topic.category.toString(),
              sentence: "🌾🚜🎮",
              createdBy: user.id,
            },
          },
        });
        break;
      case "CREATE_REQUEST":
        return sendMessage({
          type: "CREATE_RESPONSE",
        });
    }
  });
};
