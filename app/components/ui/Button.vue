<script setup lang="ts">

</script>

<template>
  <button :class="$style['button']">
    <slot/>
  </button>
</template>

<style module lang="scss">
.button {
  border: 1px solid $light-gray-2;
  background-color: $white;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0;
  text-align: center;
  padding: 8px 24px;
  border-radius: 25px;

  @media (max-width: 1439px) {
    font-size: 15px;
    line-height: 22px;
  }

  &:hover {
    cursor: pointer;
    background-color: $hover-main;
    color: $white;
    border-color: $hover-main;
  }
}
</style>