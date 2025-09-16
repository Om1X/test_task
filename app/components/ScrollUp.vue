<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

import RowUpIcon from "~/assets/img/row_up.svg";

const visible = ref<boolean>(false);

function handleScroll(): void {
  visible.value = window.scrollY > 200;
}

function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

onMounted((): void => {
  window.addEventListener('scroll', handleScroll as EventListener);
});

onUnmounted((): void => {
  window.removeEventListener('scroll', handleScroll as EventListener);
});
</script>

<template>
  <button
      v-if="visible"
      :class="$style['scroll-top']"
      @click="scrollToTop"
  >
    <RowUpIcon/>
  </button>
</template>

<style module lang="scss">
.scroll-top {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  bottom: 32px;
  right: 32px;
  border-radius: 50%;
  border: none;
  background-color: $brand;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    background: $hover-main;
  }
}
</style>
