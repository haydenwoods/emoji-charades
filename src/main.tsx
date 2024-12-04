import { Devvit, useState } from "@devvit/public-api";

import { Message, WebViewMountedResponse } from "@shared/types/message.js";

import { WEBVIEW_ID } from "@/constants/webview.js";

import { sendMessage } from "@/utils/message.js";

const onWebViewMountedRequest = async (context: Devvit.Context): Promise<void> => {
  if (!context.userId) return;

  const data: WebViewMountedResponse["data"] = {};

  if (context.userId) {
    const user = await context.reddit.getUserById(context.userId);

    if (user) {
      data.user = {
        id: user?.id,
        username: user?.username,
      };
    }
  }

  sendMessage(context, {
    type: "WEBVIEW_MOUNTED_RESPONSE",
    data,
  });
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
      <zstack height="100%" width="100%">
        <webview
          id={WEBVIEW_ID}
          url="index.html"
          height={showWebview ? "100%" : "0%"}
          width={showWebview ? "100%" : "0%"}
          onMessage={async (event) => {
            const message = event as Message;
            console.log(`Received message (${message.type})`, message);

            switch (message.type) {
              case "WEBVIEW_MOUNTED_REQUEST":
                return onWebViewMountedRequest(context);
            }
          }}
        />

        {!showWebview && (
          <vstack height="100%" width="100%" gap="large" alignment="center middle">
            <text style="heading" size="xxlarge" alignment="center">
              🔥 Emoji Game
            </text>

            <vstack gap="medium">
              <button appearance="primary" onPress={() => setShowWebview(true)}>
                🎉 New Emoji Post
              </button>

              <hstack gap="medium">
                <button appearance="secondary">🏆</button>
                <button appearance="secondary">⚙️</button>
                <button appearance="secondary">📖</button>
              </hstack>
            </vstack>
          </vstack>
        )}
      </zstack>
    );
  },
});

export default Devvit;
