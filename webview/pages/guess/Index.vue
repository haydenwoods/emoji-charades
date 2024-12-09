<template>
  <div class="size-full flex flex-col items-center justify-between">
    <h1 id="title" class="text-xl font-medium text-center">What does this emoji clue represent?</h1>

    <ui-emojis v-if="dbPost?.clue" :emojis="dbPost.clue" />

    <div class="relative flex items-center gap-x-4 max-w-xl">
      <ui-input
        id="input"
        placeholder="Guess..."
        autofocus
        v-model="input"
        @keydown.enter="onKeydownEnter"
      >
        <template #after>
          <button
            id="submit-button"
            type="button"
            class="not-disabled:cursor-pointer text-xl text-neutral-800 p-1 flex items-center justify-center disabled:text-neutral-400 transition-colors"
            :disabled="submitDisabled"
            @click="submit"
          >
            <i-material-symbols-arrow-upward-rounded />
          </button>
        </template>
      </ui-input>

      <div
        id="incorrect-notification"
        class="flex items-center gap-1.5 bg-red-100 border-2 border-red-700 rounded-full py-2.5 px-3.5 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 -z-10"
      >
        <i-material-symbols-cancel-rounded class="text-red-700" />
        <span class="font-medium leading-none text-red-800"> Incorrect </span>
      </div>

      <div
        id="correct-notification"
        class="flex items-center gap-1.5 bg-green-100 border-2 border-green-700 rounded-full py-2.5 px-3.5 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 -z-10"
      >
        <i-material-symbols-check-circle-rounded class="text-green-700" />
        <span class="font-medium leading-none text-green-800"> Correct </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { animate } from "motion";

import { Page, useAppStore } from "../../stores/app";
import { useGuessStore } from "../../stores/guess";

import { animatePopIn, animateShake } from "../../utils/animate";

const appStore = useAppStore();
const guessStore = useGuessStore();

const { dbPost } = storeToRefs(guessStore);

const input = ref<string>("");

const submitDisabled = computed(() => {
  return input.value.trim().length <= 0;
});

const submit = () => {
  const response = guessStore.submit(input.value);

  if (response?.correct) {
    animate([
      [
        "#correct-notification",
        { y: [0, -52], opacity: [0, 1] },
        { type: "spring", bounce: 0.2, visualDuration: 0.3 },
      ],
      ["#correct-notification", { opacity: [0, 1] }, { delay: 1 }],
    ]).then(() => {
      appStore.navigateTo(Page.SUMMARY);
    });
  } else if (response?.correct === false) {
    animateShake("#input");

    animate([
      [
        "#incorrect-notification",
        { y: [0, -52], opacity: [0, 1] },
        { type: "spring", bounce: 0.2, visualDuration: 0.3 },
      ],
      ["#incorrect-notification", { opacity: [1, 0] }, { delay: 0.2 }],
    ]);
  }

  input.value = "";
};

const onKeydownEnter = (event: KeyboardEvent) => {
  if (event.repeat) return;
  event.preventDefault();
  submit();
};

onMounted(() => {
  animatePopIn("#input");
  animatePopIn("#title");
});
</script>
