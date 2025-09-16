<script setup lang="ts">
withDefaults(defineProps<{
  count: number;
  active?: boolean;
  disabled?: boolean;
}>(), {
  active: false,
  disabled: false,
});
</script>

<template>
  <button
      :class="[
          $style['rooms-count'],
          active && $style['rooms-count--selected'],
      ]"
      :disabled="disabled"
  >
    {{ count }}к
  </button>
</template>

<style module lang="scss">
.rooms-count {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 200px;
  color: $main;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  background-color: $white;

  &:hover:not(:disabled),
  &--selected {
    cursor: pointer;
    background-color: $hover-main;
    color: $white;
    box-shadow: 0 6px 20px 0 rgba(149, 208, 161, 1);
  }

  &:disabled {
    cursor: not-allowed;
    color: $light-gray;
  }
}
</style>