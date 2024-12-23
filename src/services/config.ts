import { Context } from "@devvit/public-api";

import { Service } from "./index.js";

import { ConfigRepository } from "@/repositories/config.js";

import { Config } from "@shared/types/db/config.js";

const DEFAULT_CONFIG: Config = {
  flairIds: {},
};

export class ConfigService extends Service {
  configRepository: ConfigRepository;

  constructor(context: Context) {
    super(context);

    this.configRepository = new ConfigRepository(context.redis);
  }

  async get() {
    return this.configRepository.get();
  }

  async setFlairId(key: keyof Config["flairIds"], id: string) {
    let config = await this.configRepository.get();
    if (!config) config = DEFAULT_CONFIG;

    config.flairIds[key] = id;

    return this.configRepository.set(config);
  }
}
