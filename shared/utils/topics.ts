import { TOPICS } from "@shared/constants/topics.js";

import { randomRange } from "@shared/utils/random.js";

import { Topic } from "@shared/types/topic.js";

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
