import { Devvit } from "@devvit/public-api";

import { addTopicCategoryForm } from "@/forms/addTopicCategory.js";

Devvit.addMenuItem({
  label: "Emoji Charades: Add topic category",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_, context) => {
    context.ui.showForm(addTopicCategoryForm);
  },
});
