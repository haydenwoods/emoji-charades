import { Devvit, useState } from "@devvit/public-api";

import { WEBVIEW_ID } from "@/constants/webview.js";

import { Loading } from "./components/Loading.js";

import { Message } from "@shared/types/message.js";
import { MessageHandler } from "./types/message.js";

import { onMountedEvent } from "./messages/onMountedEvent.js";
import { onCreateRequest } from "./messages/onCreateRequest.js";
import { onGuessRequest } from "./messages/onGuessRequest.js";
import { onLeaderboardRequest } from "./messages/onLeaderboardRequest.js";
import { onPlayRequest } from "./messages/onPlayRequest.js";
import { onPuzzleSummaryRequest } from "./messages/onPuzzleSummaryRequest.js";

const MESSAGE_TO_HANDLER: Partial<Record<Message["type"], MessageHandler<any>>> = {
  MOUNTED_EVENT: onMountedEvent,
  CREATE_REQUEST: onCreateRequest,
  GUESS_PUZZLE_REQUEST: onGuessRequest,
  LEADERBOARD_REQUEST: onLeaderboardRequest,
  PLAY_REQUEST: onPlayRequest,
  PUZZLE_SUMMARY_REQUEST: onPuzzleSummaryRequest,
};

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addMenuItem({
  label: "Add Emoji Charades menu post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { subredditName } = context;
    if (!subredditName) return;

    const post = await context.reddit.submitPost({
      title: "Emoji Charades",
      subredditName,
      preview: <Loading />,
    });

    context.ui.navigateTo(post);
  },
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
            // console.log(`Received message (${message.type})`, message);

            const messageHandler = MESSAGE_TO_HANDLER[message.type];
            await messageHandler?.({
              message,
              context,
              app: {
                webviewMounted,
                setWebviewMounted,
              },
            });
          }}
        />
      </zstack>
    );
  },
});

export default Devvit;
