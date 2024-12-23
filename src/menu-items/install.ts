import { Devvit } from "@devvit/public-api";

import { FlairService } from "@/services/flairs.js";

import { TopicCategoriesService } from "@/services/topic-categories.js";
import { TopicsService } from "@/services/topics.js";
import { ConfigService } from "@/services/config.js";

import { createMenuPost } from "@/utils/posts/menu.js";

import { PUZZLE_FLAIR } from "@/flairs/puzzle.js";

import { DEFAULT_TOPICS } from "@shared/constants/topics.js";
import { DEFAULT_TOPIC_CATEGORIES } from "@shared/constants/topic-categories.js";

Devvit.addMenuItem({
  label: "Emoji Charades: Install",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_, context) => {
    const { subredditName } = context;
    if (!subredditName) return;

    const topicsService = new TopicsService(context);
    const topicCategoriesService = new TopicCategoriesService(context);
    const configService = new ConfigService(context);
    const flairService = new FlairService(context);

    const config = await configService.get();

    // Seed Topics and TopicCategories
    await topicsService.add(...DEFAULT_TOPICS);
    await topicCategoriesService.add(...DEFAULT_TOPIC_CATEGORIES);

    // Create or edit the exisiting flairs and store the ID in config
    const puzzleFlair = await flairService.createOrEdit(
      {
        ...PUZZLE_FLAIR,
        subredditName,
      },
      config?.flairIds.puzzle,
    );
    await configService.setFlairId("puzzle", puzzleFlair.id);

    // Create the menu post
    await createMenuPost(context.reddit, subredditName);
  },
});
