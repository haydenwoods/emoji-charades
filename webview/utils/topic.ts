import { randomRange } from "../../shared/utils/random";

import { Topic } from "../../shared/types/db/topic";

export const getRandomTopic = (topics: Topic[], exclude: Topic[] = []) => {
  const excludeNames = exclude.map(({ name }) => name);

  const includedTopics = topics.filter((topic) => !excludeNames.includes(topic.name));

  const randomIndex = randomRange(0, topics.length - 1);
  const randomTopic = includedTopics[randomIndex];

  return randomTopic;
};
