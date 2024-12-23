import { Context } from "@devvit/public-api";

import { Service } from "./index.js";

import { TopicCategoriesRepository } from "@/repositories/topic-categories.js";

import { TopicCategory } from "@shared/types/db/topic-category.js";

export class TopicCategoriesService extends Service {
  topicCategoriesRepository: TopicCategoriesRepository;

  constructor(context: Context) {
    super(context);

    this.topicCategoriesRepository = new TopicCategoriesRepository(context.redis);
  }

  async get() {
    return this.topicCategoriesRepository.get();
  }

  async add(...newTopicCategories: Omit<TopicCategory, "createdAt">[]) {
    let existingTopicCategories = await this.topicCategoriesRepository.get();
    if (!existingTopicCategories) existingTopicCategories = [];

    const now = new Date().toISOString();
    const existingNames = existingTopicCategories.map(({ name }) => name);

    const newWithTimestamps = newTopicCategories
      .filter(({ name }) => !existingNames.includes(name))
      .map((newTopicCategory) => ({
        ...newTopicCategory,
        createdAt: now,
      }));

    const updatedTopicCategories = [...existingTopicCategories, ...newWithTimestamps];
    await this.topicCategoriesRepository.set(updatedTopicCategories);

    return updatedTopicCategories;
  }
}
