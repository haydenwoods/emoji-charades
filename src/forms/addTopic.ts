import { Devvit } from "@devvit/public-api";

export const addTopicForm = Devvit.createForm(
  () => ({
    title: "Add Topic",
    fields: [
      {
        type: "select",
        name: "category",
        label: "Category",
        required: true,
        options: [{ label: "Movie", value: "movie" }],
      },
      {
        type: "paragraph",
        name: "topics",
        label: "Topics (comma seperated)",
        required: true,
      },
    ],
  }),
  (values) => {
    console.log(values);
  },
);
