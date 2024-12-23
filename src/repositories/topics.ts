import { Repository } from "./index.js";

import { Topic } from "@shared/types/db/topic.js";

export class TopicsRepository extends Repository {
  async get() {
    return this.getObject<Topic[]>(this.KEYS.topics);
  }

  async set(topics: Topic[]) {
    return this.setObject<Topic[]>(this.KEYS.topics, topics);
  }
}
