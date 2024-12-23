<template>
  <ui-tag :label="topicCategory.name" :color="topicCategory.color" :size="size">
    <template #icon>
      {{ topicCategory.emoji }}
    </template>
  </ui-tag>
</template>

<script setup lang="ts">
import { TopicCategory } from "../../../shared/types/db/topic-category";

import { UITagSize } from "./UITag.vue";

defineProps<{
  topicCategory: TopicCategory;
  size?: UITagSize;
}>();
</script>
