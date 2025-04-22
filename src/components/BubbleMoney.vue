<script setup lang="ts">
  import {computed, defineProps} from "vue";

  const props = defineProps({
    sum: {
      type: Number,
      default: 500
    },
    writeOff: {
      type: Boolean,
      default: true
    }
  })

  const bubbleColors = computed(() => {
    switch (props.writeOff) {
      case false:
        return {
          backgroundColor: '#2FB88CFF',
          border: '1px solid rgba(9, 184, 0, 1)'
        };
      case true:
      default:
        return {
          backgroundColor: '#A430F9FF',
          border: '1px solid rgba(100, 0, 173, 1)'
        };
    }
  });

</script>

<template>
  <div class="bubble flex-center" :style="bubbleColors">
    <p>
      <template v-if="writeOff">-</template>
      <template v-else>+</template>
      {{sum}}₽
    </p>
  </div>
</template>

<style scoped>
  .bubble {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    aspect-ratio: 1;
  }

  .bubble p{
    font-size: 11px;
    line-height: 1;
    color: #E6E6E6FF;
  }

  @media screen and (max-width: 860px){
    .bubble {
      width: 40px;
      height: 40px;
    }
    .bubble p{
      font-size: 8px;
    }
  }
</style>