<template>
  <div class="relative size-full flex flex-col items-center justify-between">
    <ui-page-header class="pop-in">
      <template #left>
        <ui-button size="xs" variant="plain" @click="appStore.navigateTo(Page.ABOUT)">
          <template #icon>
            <i-material-symbols-help-outline-rounded class="text-xl sm:text-2xl" />
          </template>
        </ui-button>
      </template>

      <template #title>
        <transition name="fade" mode="out-in">
          <div v-if="hasUsedHint" class="flex flex-col items-center gap-y-2">
            <div class="flex items-center gap-x-1.5">
              <h2 class="text-slate-800 font-medium hidden xs:block">The topic is a</h2>
              <ui-topic-category-tag :category="puzzle?.topic.category" />
            </div>

            <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <!-- Word -->
              <div v-for="(word, i) in topicWords" :key="i" class="flex gap-1">
                <!-- Letter -->
                <div
                  v-for="letter in word"
                  :id="`letter-${letter.index}`"
                  :key="letter.index"
                  class="letter flex justify-center items-center bg-slate-200 rounded h-7 w-6"
                >
                  <span
                    v-if="revealedLetterIndexes.includes(letter.index)"
                    class="text-lg font-medium text-slate-800 leading-none"
                  >
                    {{ letter.label.toUpperCase() }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col gap-y-0.5 items-center">
            <h1 class="text-xl sm:text-2xl font-semibold text-center text-slate-900">
              What do these emojis represent?
            </h1>
            <h2 class="text-sm sm:text-base text-slate-500 text-center">
              Clue created by u/{{ puzzle?.createdByUsername }}
            </h2>
          </div>
        </transition>
      </template>
    </ui-page-header>

    <ui-emojis v-if="puzzle?.clue" :emojis="puzzle.clue" />

    <div id="tools" class="pop-in xs:max-w-2xl flex flex-col w-full xs:flex-row items-center gap-2">
      <ui-input
        v-model="input"
        placeholder="Guess..."
        autofocus
        show-clear
        :maxlength="32"
        class="w-full"
        @keydown.enter="onKeydownEnter"
      />

      <div class="flex items-center w-full xs:w-fit gap-2">
        <ui-button label="Hint" variant="secondary" class="!gap-x-1 flex-1" @click="onClickHint">
          <template #icon>
            <i-noto-light-bulb />
          </template>
        </ui-button>

        <ui-button label="Submit" class="flex-1" @click="onClickSubmit">
          <template #icon>
            <i-noto-outbox-tray />
          </template>
        </ui-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { animate } from "motion";

import NotoPartyPopper from "~icons/noto/party-popper";
import NotoBrokenHeart from "~icons/noto/broken-heart";

import { Page, useAppStore } from "../stores/app";
import { useNotificationStore } from "../stores/notification";

import { isGuessCorrect } from "../../shared/utils/topics";
import { shuffleArray } from "../../shared/utils/random";
import { animatePop, animateShake } from "../utils/animate";
import { sendMessage } from "../utils/messages";

const HINTS_MAX: number = 3;

const appStore = useAppStore();
const notificationStore = useNotificationStore();
const { puzzle } = storeToRefs(appStore);

const input = ref<string>("");

const hintsUsed = ref<number>(0);
const revealedLetterIndexes = ref<number[]>([]);

const topicWords = computed(() => {
  if (!puzzle.value) return [];

  const words: { label: string; index: number }[][] = [];

  let wordIndex: number = 0;
  puzzle.value.topic.name.split("").forEach((letter, letterIndex) => {
    if (letter === " ") {
      wordIndex += 1;
    } else {
      const value = { label: letter.toUpperCase(), index: letterIndex };
      if (words[wordIndex]) {
        words[wordIndex].push(value);
      } else {
        words[wordIndex] = [value];
      }
    }
  });

  return words;
});

const hasUsedHint = computed<boolean>(() => {
  return hintsUsed.value > 0;
});

const onClickSubmit = () => {
  const trimmedInput = input.value.trim();
  if (trimmedInput.length <= 0) return;

  if (!puzzle.value) return;
  const { topic } = puzzle.value;

  const correct = isGuessCorrect(trimmedInput, topic);

  sendMessage({
    type: "GUESS_PUZZLE_REQUEST",
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

const onClickHint = () => {
  if (!puzzle.value) return;
  if (hintsUsed.value >= HINTS_MAX) return;

  const topicName = puzzle.value.topic.name;

  const letterIndexes = topicName.split("").reduce<number[]>((acc, letter, index) => {
    if (letter === " ") return acc;
    acc.push(index);
    return acc;
  }, []);
  const lettersPerHint = Math.floor(letterIndexes.length / (HINTS_MAX + 1));

  const unrevealedLetterIndexes = letterIndexes.filter(
    (index) => !revealedLetterIndexes.value.includes(index),
  );
  shuffleArray(unrevealedLetterIndexes);

  const nextRevealedLetters = unrevealedLetterIndexes.slice(0, lettersPerHint);
  revealedLetterIndexes.value.push(...nextRevealedLetters);

  hintsUsed.value += 1;

  nextTick(async () => {
    if (hintsUsed.value !== 1) {
      nextRevealedLetters.forEach((index) => {
        animate(
          `#letter-${index}`,
          {
            scaleX: [0, 1],
          },
          {
            duration: 0.2,
          },
        );
      });
    }
  });
};

const onKeydownEnter = (event: KeyboardEvent) => {
  if (notificationStore.isShowing("CORRECT") || notificationStore.isShowing("INCORRECT")) return;
  if (event.repeat) return;
  event.preventDefault();
  onClickSubmit();
};

onMounted(() => {
  animatePop(".pop-in", "in", true);
});
</script>
