<template>
  <div class="flex flex-col items-center gap-y-1">
    <div class="flex items-center gap-x-1.5">
      <h2 class="text-slate-800 font-medium hidden xs:block">
        {{ pastTense ? "The topic was a" : "Your topic is a" }}
      </h2>
      <ui-topic-category-tag :topic-category="topicCategory" />
    </div>
    <h1 class="text-xl sm:text-2xl text-slate-950 font-semibold text-center">"{{ topic.name }}"</h1>
  </div>
</template>

<script setup lang="ts">
import { Topic } from "../../../shared/types/db/topic";
import { TopicCategory } from "../../../shared/types/db/topic-category";

defineProps<{
  topic: Topic;
  topicCategory: TopicCategory;
  pastTense?: boolean;
}>();
</script>
