<template>
  <div class="mx-auto">
    <icon v-if="icon" class="text-3xl" />
    <span v-else class="text-xl text-slate-600">{{ rank }}</span>
  </div>

  <span class="text-slate-800" :class="isPodium ? 'font-medium text-2xl  ' : 'text-xl '">
    {{ username }}
  </span>
  <span class="ml-auto text-slate-800" :class="isPodium ? 'text-2xl font-medium ' : 'text-lg '">
    {{ xp }}
  </span>
</template>

<script setup lang="ts">
import { Component, computed } from "vue";

import Noto1stPlaceMedal from "~icons/noto/1st-place-medal";
import Noto2ndPlaceMedal from "~icons/noto/2nd-place-medal";
import Noto3rdPlaceMedal from "~icons/noto/3rd-place-medal";

const props = defineProps<{
  username: string;
  xp: string | number;
  rank: number;
}>();

const icon = computed<Component | undefined>(() => {
  switch (props.rank) {
    case 1:
      return Noto1stPlaceMedal;
    case 2:
      return Noto2ndPlaceMedal;
    case 3:
      return Noto3rdPlaceMedal;
    default:
      return undefined;
  }
});

const isPodium = computed(() => {
  return props.rank <= 3;
});
</script>
