<script setup lang="ts">
  import { defineProps } from "vue";

  const props = defineProps({
    title: {
      type: String
    },
    imgSrc: {
      type: String,
      required: true
    }
  });
</script>

<template>
  <div class="bubble flex-center">
    <img :src="imgSrc" alt="story-img" />
    <p class="xs-text">{{title}}</p>
  </div>
</template>

<style scoped>
  .bubble {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
    text-align: center;
    max-width: 92px;
    margin-left: 3px;
  }

  .bubble img{
    width: 64px;
    height: 64px;
    aspect-ratio: 1;
  }

  .bubble .xs-text {
    font-family: 'Sora', sans-serif;
    font-weight: 501;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 860px) {
    .bubble {
      margin-left: 16px;
    }
    .bubble img{
      width: 84px;
      height: 84px;
      aspect-ratio: 1;
    }
  }
</style>
