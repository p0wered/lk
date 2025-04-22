<script setup lang="ts">
  import {ref} from 'vue';

  const container = ref<HTMLElement | null>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  function onMouseDown(e: MouseEvent) {
    if (!container.value) return;
    isDown = true;
    container.value.classList.add('active');
    startX = e.pageX - container.value.offsetLeft;
    scrollLeft = container.value.scrollLeft;
  }

  function onMouseUp() {
    if (!container.value) return;
    isDown = false;
    container.value.classList.remove('active');
  }

  function onMouseLeave() {
    if (!container.value) return;
    isDown = false;
    container.value.classList.remove('active');
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDown || !container.value) return;
    e.preventDefault();
    const x = e.pageX - container.value.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.value.scrollLeft = scrollLeft - walk;
  }
</script>

<template>
  <div
      class="draggable-scroll"
      ref="container"
      @mousedown.prevent="onMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
      @mousemove="onMouseMove"
  >
    <slot />
  </div>
</template>

<style scoped>
  .draggable-scroll {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    cursor: grab;
    user-select: none;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-right: 16px;
    width: 100%;
  }
  .draggable-scroll.active {
    cursor: grabbing;
  }
  .draggable-scroll > * {
    flex: 0 0 auto;
  }
  .draggable-scroll::-webkit-scrollbar {
    display: none;
  }
  .draggable-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
