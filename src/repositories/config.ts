import { Repository } from "./index.js";

import { Config } from "@shared/types/db/config.js";

export class ConfigRepository extends Repository {
  async get() {
    return this.getObject<Config>(this.KEYS.config);
  }

  async set(data: Config) {
    return this.setObject<Config>(this.KEYS.config, data);
  }
}
