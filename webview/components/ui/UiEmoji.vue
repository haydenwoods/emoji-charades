<template>
  <span class="select-none" :class="isSafari || isSafariWebview ? 'font-sans' : 'font-emoji'">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
// Temporary fix to use Apple emojis when on Safari since ColrV1 doesn't seem to work.
// Detect Safari: https://stackoverflow.com/a/9851769/7485338
// TODO: Find a better solution to have Noto Color Emoji on all browsers
const isSafari = navigator.userAgent.indexOf("Safari") != -1;
const isSafariWebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
</script>
