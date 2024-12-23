import { Service } from "@/services/index.js";

import { CreateFlairTemplateOptions, EditFlairTemplateOptions } from "@devvit/public-api";

export class FlairService extends Service {
  async createOrEdit(
    flairTemplate: CreateFlairTemplateOptions,
    id?: EditFlairTemplateOptions["id"],
  ) {
    if (id) {
      return this.reddit.editFlairTemplate({
        ...flairTemplate,
        id,
      });
    } else {
      return this.reddit.createPostFlairTemplate(flairTemplate);
    }
  }
}
