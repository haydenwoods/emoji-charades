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
  label: "Add Emoji Charades post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const subreddit = await context.reddit.getCurrentSubreddit();
    const post = await context.reddit.submitPost({
      title: "Emoji Charades",
      subredditName: subreddit.name,
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
        <webview
          id={WEBVIEW_ID}
          url="index.html"
          height={webviewMounted ? "100%" : "0%"}
          width={webviewMounted ? "100%" : "0%"}
          onMessage={async (event) => {
            const message = event as Message;
            console.log(`Received message (${message.type})`, message);

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

        {!webviewMounted && <Loading />}
      </zstack>
    );
  },
});

export default Devvit;
