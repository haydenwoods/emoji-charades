import { Devvit } from "@devvit/public-api";

import { ConfigService } from "@/services/config.js";
import { TopicsService } from "@/services/topics.js";
import { TopicCategoriesService } from "@/services/topic-categories.js";

Devvit.addMenuItem({
  label: "Emoji Charades: Log config",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_, context) => {
    const configService = new ConfigService(context);
    const topicsService = new TopicsService(context);
    const topicCategoriesService = new TopicCategoriesService(context);

    const [config, topics, topicCategories] = await Promise.all([
      configService.get(),
      topicsService.get(),
      topicCategoriesService.get(),
    ]);

    console.log("Config: ", config);
    console.log("Topics: ", topics);
    console.log("Topic Categories: ", topicCategories);
  },
});
