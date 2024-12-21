<template>
  <div class="relative size-full flex flex-col items-center justify-between">
    <ui-page-header>
      <template #left>
        <ui-button size="xs" variant="plain" @click="appStore.navigateTo(Page.ABOUT)">
          <template #icon>
            <i-material-symbols-help-outline-rounded class="text-xl sm:text-2xl" />
          </template>
        </ui-button>
      </template>

      <template #title>
        <div class="flex flex-col gap-y-0.5 items-center">
          <h1 class="text-xl sm:text-2xl font-semibold text-center text-slate-900">
            What do these emojis represent?
          </h1>
          <h2 class="text-sm sm:text-base text-slate-500 text-center">
            Clue created by u/{{ puzzle?.createdByUsername }}
          </h2>
        </div>
      </template>
    </ui-page-header>

    <ui-emojis v-if="puzzle?.clue" :emojis="puzzle.clue" />

    <div id="tools" class="pop-in max-w-2xl flex items-center gap-2">
      <ui-input
        v-model="input"
        placeholder="Guess..."
        autofocus
        show-clear
        :maxlength="32"
        @keydown.enter="onKeydownEnter"
      />

      <ui-button label="Submit" @click="submit">
        <template #icon>
          <i-noto-outbox-tray />
        </template>
      </ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import NotoPartyPopper from "~icons/noto/party-popper";
import NotoBrokenHeart from "~icons/noto/broken-heart";

import { Page, useAppStore } from "../stores/app";
import { useNotificationStore } from "../stores/notification";

import { isGuessCorrect } from "../../shared/utils/topics";
import { animatePop, animateShake } from "../utils/animate";
import { sendMessage } from "../utils/messages";

const appStore = useAppStore();
const notificationStore = useNotificationStore();
const { puzzle } = storeToRefs(appStore);

const input = ref<string>("");

const submit = () => {
  const trimmedInput = input.value.trim();
  if (trimmedInput.length <= 0) return;

  if (!puzzle.value) return;
  const { topic } = puzzle.value;

  const correct = isGuessCorrect(trimmedInput, topic);

  sendMessage({
    type: "PUZZLE_GUESS_REQUEST",
    data: {
      input: trimmedInput,
    },
  });

  if (correct) {
    // Update player played puzzles
    const now = new Date().toISOString();
    appStore.player?.playedPuzzles.push({
      id: puzzle.value.id,
      guesses: [],
      xpGained: 0,
      completedAt: now,
      createdAt: now,
    });

    notificationStore.showNotification(
      {
        id: "CORRECT",
        label: "Correct",
        icon: NotoPartyPopper,
        theme: "success",
      },
      2000,
    );

    setTimeout(() => {
      appStore.navigateTo(Page.PUZZLE_SUMMARY);
    }, 2000);
  } else {
    animateShake("#tools");

    notificationStore.showNotification(
      {
        id: "INCORRECT",
        label: "Incorrect",
        icon: NotoBrokenHeart,
        theme: "error",
      },
      1000,
    );
  }

  input.value = "";
};

const onKeydownEnter = (event: KeyboardEvent) => {
  if (notificationStore.isShowing("CORRECT") || notificationStore.isShowing("INCORRECT")) return;
  if (event.repeat) return;
  event.preventDefault();
  submit();
};

onMounted(() => {
  animatePop(".pop-in", "in", true);
});
</script>
