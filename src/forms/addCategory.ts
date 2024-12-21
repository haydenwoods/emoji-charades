import { Devvit } from "@devvit/public-api";

const COLORS = ["blue", "orange", "red", "emerald", "purple", "yellow", "indigo", "amber"];

export const addCategoryForm = Devvit.createForm(
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
        options: COLORS.map((color) => ({ label: color, value: color })),
        required: true,
      },
    ],
  },
  (values) => {
    console.log(values);
  },
);
