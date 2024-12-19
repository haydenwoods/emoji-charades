<template>
  <span class="select-none" :class="isSafari || isSafariWebview ? 'font-sans' : 'font-emoji'">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
// Detect Safari: https://stackoverflow.com/a/9851769/7485338
const isSafari = navigator.userAgent.indexOf("Safari") != -1;
const isSafariWebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
</script>
