import { stringSimilarity } from "string-similarity-js";

import { TOPICS } from "@shared/constants/topics.js";

import { randomRange } from "@shared/utils/random.js";

import { Topic } from "@shared/types/topic.js";

const SIMILAR_MIN_PERCENTAGE = 0.9;

export const getRandomTopic = (options?: {
  exclude?: Topic[];
}): { topic: Topic; remaining: number } => {
  let topics = TOPICS;

  if (options?.exclude) {
    const excludeNames = options.exclude.map(({ name }) => name);
    topics = topics.filter((topic) => !excludeNames.includes(topic.name));
  }

  const index = randomRange(0, topics.length - 1);
  const topic = topics[index];

  return {
    topic,
    remaining: topics.length - 1,
  };
};

export const isGuessSimilar = (input: string, topic: Topic): boolean => {
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
