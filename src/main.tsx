import { Devvit, useState } from "@devvit/public-api";

import { WEBVIEW_ID } from "@/constants/webview.js";

import { sendMessage } from "./utils/message.js";

import { Loading } from "./components/Loading.js";

import { Message } from "@shared/types/message.js";

import { MESSAGE_TYPE_TO_HANDLER } from "./messages/index.js";

// Menu items
import "./menu-items/install.js";
import "./menu-items/addTopic.js";
import "./menu-items/addTopicCategory.js";
// Forms
import "./forms/addTopic.js";
import "./forms/addTopicCategory.js";

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: "Emoji Charades",
  height: "tall",
  render: (context) => {
    const [webviewMounted, setWebviewMounted] = useState(false);

    return (
      <zstack width="100%" height="100%">
        <Loading />

        <webview
          id={WEBVIEW_ID}
          url="index.html"
          height="100%"
          width="100%"
          onMessage={async (event) => {
            const message = event as Message;
            console.log(`Received message (${message.type})`, message);

            const handler = MESSAGE_TYPE_TO_HANDLER[message.type];
            if (!handler) return;

            const response = await handler({
              message,
              context,
              app: {
                webviewMounted,
                setWebviewMounted,
              },
            });
            if (!response) return;

            sendMessage(context.ui, response);
          }}
        />
      </zstack>
    );
  },
});

export default Devvit;
