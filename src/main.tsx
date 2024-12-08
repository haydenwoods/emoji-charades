import { Devvit, useState } from "@devvit/public-api";

import { WEBVIEW_ID } from "@/constants/webview.js";

import { Loading } from "./components/Loading.js";

import { Message } from "@shared/types/message.js";
import { MessageHandler } from "./types/message.js";

import { onMountedEvent } from "./messages/onMountedEvent.js";
import { onLoadedEvent } from "./messages/onLoadedEvent.js";
import { onCreateRequest } from "./messages/onCreateRequest.js";
import { onGuessRequest } from "./messages/onGuessRequest.js";

const MESSAGE_TO_HANDLER: Partial<Record<Message["type"], MessageHandler<any>>> = {
  MOUNTED_EVENT: onMountedEvent,
  LOADED_EVENT: onLoadedEvent,
  CREATE_REQUEST: onCreateRequest,
  GUESS_REQUEST: onGuessRequest,
};

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addMenuItem({
  label: "Add Emoji Game post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const subreddit = await context.reddit.getCurrentSubreddit();
    const post = await context.reddit.submitPost({
      title: "Emoji Game",
      subredditName: subreddit.name,
      preview: <Loading />,
    });
    context.ui.showToast({ text: "Created Emoji Game post!" });
    context.ui.navigateTo(post);
  },
});

Devvit.addCustomPostType({
  name: "Emoji Game",
  height: "tall",
  render: (context) => {
    const [loading, setLoading] = useState(true);

    const webviewSize = loading ? "0%" : "100%";

    return (
      <zstack width="100%" height="100%">
        <webview
          id={WEBVIEW_ID}
          url="index.html"
          height={webviewSize}
          width={webviewSize}
          onMessage={async (event) => {
            const message = event as Message;
            console.log(`Received message (${message.type})`, message);

            const messageHandler = MESSAGE_TO_HANDLER[message.type];
            await messageHandler?.({
              message,
              context,
              app: {
                loading,
                setLoading,
              },
            });
          }}
        />

        {loading && <Loading />}
      </zstack>
    );
  },
});

export default Devvit;
