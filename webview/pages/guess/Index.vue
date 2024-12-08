<template>
  <div class="size-full flex flex-col items-center justify-center">
    <h1 id="title" class="text-lg font-medium">What does this emoji phrase represent?</h1>

    <ui-emojis v-if="dbPost?.emojis" :emojis="dbPost.emojis" />

    <div class="flex items-center gap-x-4 max-w-xl">
      <ui-input
        id="input"
        placeholder="Guess..."
        autofocus
        v-model="input"
        @keydown.enter="onKeydownEnter"
      >
        <template #after>
          <button
            type="button"
            class="not-disabled:cursor-pointer text-xl text-neutral-600 p-1 flex items-center justify-center"
            @click="submit"
          >
            <i-material-symbols-arrow-upward-rounded />
          </button>
        </template>
      </ui-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { animate } from "motion";

import { useGuessStore } from "../../stores/guess";

import { animatePopIn, animateShake } from "../../utils/animate";

const guessStore = useGuessStore();
const { dbPost } = storeToRefs(guessStore);

const input = ref<string>("");

const submit = () => {
  const response = guessStore.submit(input.value);

  if (response?.correct) {
    // Animate
  } else if (response?.correct === false) {
    animateShake("#input");
  }
};

const onKeydownEnter = (event: Event) => {
  event.preventDefault();
  submit();
};

onMounted(() => {
  animatePopIn("#input");
  animatePopIn("#title");
});
</script>
