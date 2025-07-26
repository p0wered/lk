<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 1000
    },
    size: {
      type: Number,
      default: 86
    },
    stroke: {
      type: Number,
      default: 10
    }
  })

  const radius = computed(() => (props.size - props.stroke) / 2)
  const center = computed(() => props.size / 2)
  const circumference = computed(() => 2 * Math.PI * radius.value)
  const offset = computed(() => {
    const progress = Math.min(props.value / props.max, 1)
    return circumference.value * (1 - progress)
  })

  const innerStroke = computed(() => Math.max(props.stroke - 4, 1))
</script>

<template>
  <div class="progress-container">
    <svg class="progress-ring" :width="size" :height="size">
      <defs>
        <linearGradient id="progressGradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c7f0b6" />
          <stop offset="100%" stop-color="#3070f8" />
        </linearGradient>
      </defs>
      <circle
          class="progress-ring__background"
          :r="radius"
          :cx="center"
          :cy="center"
          :stroke-width="stroke"
      />
      <circle
          class="progress-ring__circle"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="offset"
          :r="radius"
          :cx="center"
          :cy="center"
          stroke="url(#progressGradient)"
          :stroke-width="innerStroke"
      />
    </svg>
    <div class="progress-text">
      <div class="value">{{ value }}</div>
      <div class="max">/ {{ max }}</div>
    </div>
  </div>
</template>

<style scoped>
  .progress-container {
    position: relative;
    width: fit-content;
    display: inline-block;
  }

  .progress-ring {
    transform: rotate(-90deg);
  }

  .progress-ring__background {
    fill: none;
    stroke: #191919;
  }

  .progress-ring__circle {
    fill: none;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .value {
    font-size: 24px;
  }

  .max {
    font-size: 12px;
  }
</style>