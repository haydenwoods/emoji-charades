import { Devvit } from "@devvit/public-api";

import { addTopicForm } from "@/forms/addTopic.js";

Devvit.addMenuItem({
  label: "Emoji Charades: Add topic",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_, context) => {
    context.ui.showForm(addTopicForm);
  },
});
