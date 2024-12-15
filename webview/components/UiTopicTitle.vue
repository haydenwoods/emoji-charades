<template>
  <div class="flex flex-col items-center gap-y-1">
    <div class="flex items-center gap-x-1.5">
      <h2 class="text-slate-800 font-medium">
        {{ pastTense ? "The topic was a" : "Your topic is a" }}
      </h2>
      <ui-topic-category-tag :category="topic.category" />
    </div>
    <h1 class="text-2xl text-slate-950 font-semibold text-center">"{{ topic.name }}"</h1>
  </div>
</template>

<script setup lang="ts">
import { Topic } from "../../shared/types/topic";

defineProps<{
  topic: Topic;
  pastTense?: boolean;
}>();
</script>
