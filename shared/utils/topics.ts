import { TOPICS } from "@shared/constants/topics.js";

import { randomRange } from "@shared/utils/random.js";

import { Category } from "@shared/types/category.js";
import { Topic } from "@shared/types/topic.js";

export const getRandomTopic = (category?: Category): Topic => {
  let topics = TOPICS;

  if (category) {
    topics = topics.filter((topic) => topic.category === category);
  }

  const index = randomRange(0, topics.length);
  const topic = topics[index];

  return topic;
};
