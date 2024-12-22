import { Devvit } from "@devvit/public-api";

import { TopicCategoriesService } from "@/services/topic-categories.js";

import { createMenuPost } from "@/utils/posts/menu.js";

import { TOPIC_CATEGORIES } from "@/seed/topic-categories.js";

Devvit.addMenuItem({
  label: "Emoji Charades: Install",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_, context) => {
    const { subredditName } = context;
    if (!subredditName) return;

    const topicCategoriesService = new TopicCategoriesService(context);

    // TODO: Seed topics, add flairs for puzzle and menu
    await Promise.all([
      createMenuPost(context.reddit, subredditName),
      topicCategoriesService.add(...TOPIC_CATEGORIES),
    ]);
  },
});
