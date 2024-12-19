<template>
  <span class="select-none" :class="isSafari ? 'font-sans' : 'font-emoji'">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
const isSafari = navigator.userAgent.indexOf("Safari") !== -1;
</script>
