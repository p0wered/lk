<script setup lang="ts">
  import {defineProps} from "vue";

  const props = defineProps<{
    backgroundColor: string;
    title: string;
    desc: string;
    backgroundImage: string;
  }>();
</script>

<template>
  <div
      class="news-item"
      :style="{
      backgroundColor: props.backgroundColor,
      backgroundImage: `url(${props.backgroundImage})`
    }"
  >
    <p class="title">{{title}}</p>
    <p class="xs-text">{{desc}}</p>
  </div>
</template>

<style scoped>
  .news-item {
    min-width: 226px;
    height: 195px;
    border-radius: 12px;
    border: 1px solid var(--content-dark);
    box-shadow: 4px 4px 0 var(--content-dark);
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: bottom center;
    padding: 16px;
    text-align: center;
    margin-left: 16px;
  }

  .title{
    font-size: 19px;
    line-height: 120%;
    font-family: 'Sora', sans-serif;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .news-item .xs-text{
    color: rgba(60, 60, 61, 0.6);
    font-family: 'Sora', sans-serif;
    font-weight: 400;
  }
</style>
