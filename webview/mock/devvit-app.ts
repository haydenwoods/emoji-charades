import { Message } from "@shared/types/message";

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
        return sendMessage({
          type: "USER_DATA_EVENT",
          data: {
            user: {
              id: "t2_12345",
              username: "Username",
            },
          },
        });
    }
  });
};
