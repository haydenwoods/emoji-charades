import { Devvit } from "@devvit/public-api";

import { createMenuPost } from "@/utils/posts/menu.js";

Devvit.addMenuItem({
  label: "Emoji Charades: Add menu post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_, { reddit, ui, subredditName }) => {
    if (!subredditName) return;
    const post = await createMenuPost(reddit, subredditName);
    ui.navigateTo(post);
  },
});
