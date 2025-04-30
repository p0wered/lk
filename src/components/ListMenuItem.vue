<script setup lang="ts">
import {defineProps} from 'vue'
import SvgListArrow from "../icons/SvgListArrow.vue";

const props = defineProps<{
  title: string
  desc: string
  iconSrc: string
}>()
</script>

<template>
  <div class="item">
    <div class="inner">
      <img :src="props.iconSrc" alt="icon" class="icon" />
      <div>
        <p class="list-name">{{ title }}</p>
        <p class="list-desc">{{ desc }}</p>
      </div>
    </div>
    <SvgListArrow/>
  </div>
</template>

<style scoped>
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-radius: 12px;
    transition: .2s;
    cursor: pointer;
  }

  .inner {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    width: 49px;
    height: 49px;
    object-fit: contain;
  }

  .list-name {
    font-size: 14px;
    margin-bottom: 2px;
  }

  .list-desc {
    font-size: 12px;
    color: var(--content-neutral);
  }

  .item:hover {
    background-color: #00000014;
  }

  .item:active {
    background-color: #00000025;
  }

  @media screen and (max-width: 860px) {
    .item:hover {
      background-color: transparent;
    }
    .item:active {
      background-color: #00000015;
    }
  }
</style>
