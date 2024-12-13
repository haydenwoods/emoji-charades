<template>
  <ui-tag :label="name" :color="color" :size="size">
    <template #icon>
      <icon />
    </template>
  </ui-tag>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { CATEGORY_TO_COLOR, CATEGORY_TO_NAME } from "../../shared/constants/categories";

import { Category } from "../../shared/types/category";

import { UITagSize } from "./UITag.vue";

import NotoFilmProjector from "~icons/noto/film-projector";
import NotoTelevision from "~icons/noto/television";
import NotoVideoGame from "~icons/noto/video-game";
import NotoOpenBook from "~icons/noto/open-book";
import NotoBustInSilhouette from "~icons/noto/bust-in-silhouette";
import NotoGlowingStar from "~icons/noto/glowing-star";
import NotoSpeechBalloon from "~icons/noto/speech-balloon";

const CATEGORY_TO_ICON: Record<Category, any> = {
  [Category.MOVIE]: NotoFilmProjector,
  [Category.TV_SHOW]: NotoTelevision,
  [Category.VIDEO_GAME]: NotoVideoGame,
  [Category.BOOK]: NotoOpenBook,
  [Category.CHARACTER]: NotoBustInSilhouette,
  [Category.FAMOUS_PERSON]: NotoGlowingStar,
  [Category.PHRASE]: NotoSpeechBalloon,
};

const props = defineProps<{
  category: Category;
  size?: UITagSize;
}>();

const name = computed(() => CATEGORY_TO_NAME[props.category]);
const color = computed(() => CATEGORY_TO_COLOR[props.category]);
const icon = computed(() => CATEGORY_TO_ICON[props.category]);
</script>
