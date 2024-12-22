import { Devvit } from "@devvit/public-api";

import { TopicCategoriesService } from "@/services/topic-categories.js";

import { TOPIC_CATEGORY_COLORS, TopicCategoryColor } from "@shared/types/db/topic-category.js";

export const addTopicCategoryForm = Devvit.createForm(
  {
    title: "Add Category",
    fields: [
      {
        type: "string",
        name: "name",
        label: "Name",
        required: true,
      },
      {
        type: "string",
        name: "emoji",
        label: "Emoji",
        required: true,
      },
      {
        type: "select",
        name: "color",
        label: "Color",
        options: TOPIC_CATEGORY_COLORS.map((color) => ({ label: color, value: color })),
        required: true,
      },
    ],
  },
  async ({ values }, context) => {
    const topicCategoriesService = new TopicCategoriesService(context);
    const { updatedTopicCategories } = await topicCategoriesService.add({
      name: values.name,
      emoji: values.emoji,
      color: values.color[0] as TopicCategoryColor,
    });

    console.log(updatedTopicCategories);
  },
);
