<template>
  <div
    class="flex items-center rounded-full inset-ring-2 inset-ring-neutral-300 bg-white"
    :class="[Boolean($slots.before) && 'pl-3', Boolean($slots.after) && 'pr-3']"
  >
    <slot name="before"></slot>

    <input
      type="text"
      class="font-medium text-xl min-w-0 placeholder:text-neutral-400 !outline-none py-3"
      :class="[Boolean($slots.before) ? 'pl-0' : 'pl-5', Boolean($slots.after) ? 'pr-0' : 'pr-5']"
      v-bind="$attrs"
    />

    <slot name="after"></slot>
  </div>
</template>
