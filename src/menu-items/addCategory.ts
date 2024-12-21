import { Devvit } from "@devvit/public-api";

import { addCategoryForm } from "@/forms/addCategory.js";

Devvit.addMenuItem({
  label: "Emoji Charades: Add category",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_, context) => {
    context.ui.showForm(addCategoryForm);
  },
});
