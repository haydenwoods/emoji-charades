import { ref } from "vue";
import { defineStore } from "pinia";

import { DBPost } from "../../shared/types/db/post";

export const useGuessStore = defineStore("guess", () => {
  const dbPost = ref<DBPost>();

  return {
    dbPost,
  };
});
