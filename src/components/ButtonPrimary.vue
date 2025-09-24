<script setup lang="ts">
  import {defineProps, defineEmits} from 'vue'

defineProps({
    text: {
      type: String,
      default: 'Button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['click'])
</script>

<template>
  <button
      class="btn-primary"
      @click="emit('click')"
      :disabled="disabled"
  >
    {{text}}
  </button>
</template>

<style scoped>
  .btn-primary {
    padding: 14px 64px;
    border-radius: 999px;
    border: none;
    background-color: var(--content-dark);
    color: var(--content-light);
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 18px;
  }

  .btn-primary:disabled {
    background-color: var(--content-darker);
    color: var(--content-neutral);
    cursor: not-allowed;
  }

  @media screen and (max-width: 760px) {
    .btn-primary {
      width: 100%;
    }
  }
</style>