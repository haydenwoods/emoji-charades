import { Context } from "@devvit/public-api";

import { Service } from "./index.js";

import { TopicsRepository } from "@/repositories/topics.js";
import { Topic } from "@shared/types/db/topic.js";

export class TopicsService extends Service {
  topicsRepository: TopicsRepository;

  constructor(context: Context) {
    super(context);

    this.topicsRepository = new TopicsRepository(context.redis);
  }

  async get() {
    return this.topicsRepository.get();
  }

  async add(...newTopics: Omit<Topic, "createdAt">[]) {
    let existingTopics = await this.topicsRepository.get();
    if (!existingTopics) existingTopics = [];

    const now = new Date().toISOString();
    const existingNames = existingTopics.map(({ name }) => name);

    const newTopicsWithTimestamps = newTopics
      .filter(({ name }) => !existingNames.includes(name))
      .map((newTopicCategory) => ({
        ...newTopicCategory,
        createdAt: now,
      }));

    const updatedTopics = [...existingTopics, ...newTopicsWithTimestamps];
    await this.topicsRepository.set(updatedTopics);

    return updatedTopics;
  }
}
