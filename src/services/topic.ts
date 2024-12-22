import { Context } from "@devvit/public-api";

import { Service } from "./index.js";

import { TopicsRepository } from "@/repositories/topics.js";

export class TopicService extends Service {
  topicsRepository: TopicsRepository;

  constructor(context: Context) {
    super(context);

    this.topicsRepository = new TopicsRepository(context.redis);
  }

  async add() {}
}
