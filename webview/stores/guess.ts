import { ref } from "vue";
import { defineStore } from "pinia";

import { PostData } from "../../shared/types/post-data";

export const useGuessStore = defineStore("guess", () => {
  const postData = ref<PostData>();

  return {
    postData,
  };
});
