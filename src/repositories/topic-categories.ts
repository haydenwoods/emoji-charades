import { Repository } from "./index.js";

import { TopicCategory } from "@shared/types/db/topic-category.js";

export class TopicCategoriesRepository extends Repository {
  async get() {
    return this.getObject<TopicCategory[]>(this.KEYS.topicCategories);
  }

  async set(topicCategories: TopicCategory[]) {
    return this.setObject<TopicCategory[]>(this.KEYS.topicCategories, topicCategories);
  }
}
