import { ref } from "vue";
import { defineStore } from "pinia";

import { useAppStore, Page } from "./app";

import { DBPost } from "@shared/types/db/post";
import { sendMessage } from "@/utils/messages";
import { isGuessSimilar } from "@shared/utils/topics";

export const useGuessStore = defineStore("guess", () => {
  const dbPost = ref<DBPost>();

  const submit = (input: string) => {
    if (input.trim().length <= 0) return;

    if (!dbPost.value) return;
    const { topic } = dbPost.value;

    const correct = isGuessSimilar(input, topic);

    sendMessage({
      type: "GUESS_REQUEST",
      data: {
        input,
      },
    });

    return {
      correct,
    };
  };

  return {
    dbPost,
    submit,
  };
});
