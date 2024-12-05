import { Devvit, useState } from "@devvit/public-api";

import { Menu } from "@/pages/Menu.js";

import { WEBVIEW_ID } from "@/constants/webview.js";

import { Message } from "@shared/types/message.js";
import { MessageHandler } from "./types/message.js";

import { onMountedEvent } from "./messages/onMountedEvent.js";
import { onCreateRequest } from "./messages/onCreateRequest.js";

const MESSAGE_TYPE_TO_HANDLER: Partial<Record<Message["type"], MessageHandler<any>>> = {
  MOUNTED_EVENT: onMountedEvent,
  CREATE_REQUEST: onCreateRequest,
};

Devvit.configure({
  redditAPI: true,
});

Devvit.addMenuItem({
  label: "Add Emoji Game post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      title: "Main emoji game post",
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: "Created post!" });
  },
});

Devvit.addCustomPostType({
  name: "Emoji Game",
  height: "tall",
  render: (context) => {
    const [showWebview, setShowWebview] = useState(false);

    return (
      <zstack width="100%" height="100%">
        <webview
          id={WEBVIEW_ID}
          url="index.html"
          height={showWebview ? "100%" : "0%"}
          width={showWebview ? "100%" : "0%"}
          onMessage={async (event) => {
            const message = event as Message;
            console.log(`Received message (${message.type})`, message);

            const messageHandler = MESSAGE_TYPE_TO_HANDLER[message.type];
            await messageHandler?.(message, context);
          }}
        />

        {!showWebview && <Menu context={context} app={{ showWebview, setShowWebview }} />}
      </zstack>
    );
  },
});

export default Devvit;
