<template>
  <span class="text-3xl sm:text-4xl">
    <i-noto-one-oclock v-if="hour === 1" />
    <i-noto-two-oclock v-else-if="hour === 2" />
    <i-noto-three-oclock v-else-if="hour === 3" />
    <i-noto-four-oclock v-else-if="hour === 4" />
    <i-noto-five-oclock v-else-if="hour === 5" />
    <i-noto-six-oclock v-else-if="hour === 6" />
    <i-noto-seven-oclock v-else-if="hour === 7" />
    <i-noto-eight-oclock v-else-if="hour === 8" />
    <i-noto-nine-oclock v-else-if="hour === 9" />
    <i-noto-ten-oclock v-else-if="hour === 10" />
    <i-noto-eleven-oclock v-else-if="hour === 11" />
    <i-noto-twelve-oclock v-else-if="hour === 12" />
  </span>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const HOUR_MIN = 1;
const HOUR_MAX = 12;

const hour = ref<number>(1);

const incrementHour = () => {
  if (hour.value < HOUR_MAX) {
    hour.value += 1;
  } else {
    hour.value = HOUR_MIN;
  }
};

onMounted(() => {
  setInterval(() => {
    incrementHour();
  }, 1000 / HOUR_MAX);
});
</script>
