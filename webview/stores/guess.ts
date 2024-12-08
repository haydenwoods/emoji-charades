import { ref } from "vue";
import { defineStore } from "pinia";
import stringSimilarity from "string-similarity-js";

import { useAppStore, Page } from "./app";

import { DBPost } from "@shared/types/db/post";
import { sendMessage } from "@/utils/messages";

const CORRECT_SIMILARITY_PERCENTAGE: number = 0.9;

export const useGuessStore = defineStore("guess", () => {
  const appStore = useAppStore();

  const dbPost = ref<DBPost>();

  const submit = (input: string) => {
    if (!dbPost.value) return;
    const { topic } = dbPost.value;

    // Make sure the input isn't just whitespace
    const trimmedInput = input.trim();
    if (trimmedInput.length <= 0) return;

    // Check how similar the input is to all of the topics names
    const topicNames = [topic.name, ...(topic.alternateNames ?? [])];
    const topicNameSimilarities = topicNames.map((name) => stringSimilarity(trimmedInput, name));
    const topicNamesHighestSimilarity = Math.max(...topicNameSimilarities);

    // If correct, navigate to the summary page
    const correct = topicNamesHighestSimilarity >= CORRECT_SIMILARITY_PERCENTAGE;
    if (correct) {
      appStore.navigateTo(Page.SUMMARY);
    }

    sendMessage({
      type: "GUESS_REQUEST",
      data: {
        input: trimmedInput,
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
