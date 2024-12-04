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
      case "WEBVIEW_MOUNTED_REQUEST":
        return sendMessage({
          type: "WEBVIEW_MOUNTED_RESPONSE",
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
