import { stringSimilarity } from "string-similarity-js";

import { Topic } from "@shared/types/topic.js";

const SIMILAR_MIN_PERCENTAGE = 0.9;

export const isGuessCorrect = (input: string, topic: Topic): boolean => {
  // Make sure the input isn't just whitespace
  const trimmedInput = input.trim();
  if (trimmedInput.length <= 0) return false;

  // Check how similar the input is to all of the topics names
  const topicNames = [topic.name, ...(topic.alternateNames ?? [])];
  const topicNameSimilarities = topicNames.map((name) => stringSimilarity(trimmedInput, name));
  const topicNamesHighestSimilarity = Math.max(...topicNameSimilarities);

  // If correct, navigate to the summary page
  const isSimilar = topicNamesHighestSimilarity >= SIMILAR_MIN_PERCENTAGE;

  return isSimilar;
};
