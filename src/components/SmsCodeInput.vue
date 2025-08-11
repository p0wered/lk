<script setup lang="ts">
import {ref, watch, nextTick, onMounted} from 'vue';

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(['update:modelValue']);

const codeDigits = ref<string[]>(['', '', '', '']);
const codeRefs = ref<(HTMLInputElement | null)[]>([]);

onMounted(() => {
  codeRefs.value = Array(4).fill(null);
});

watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal.length === 4) {
        codeDigits.value = newVal.split('');
      }
    }
);

watch(codeDigits, () => {
  const value = codeDigits.value.join('');
  emit('update:modelValue', value);
});

const onInput = (index: number) => {
  const current = codeDigits.value[index];
  if (current.length > 1) {
    codeDigits.value[index] = current.charAt(current.length - 1);
  }

  if (current && index < 3) {
    nextTick(() => {
      if (codeRefs.value[index + 1]) {
        codeRefs.value[index + 1]?.focus();
      }
    });
  }
};

const onBackspace = (index: number) => {
  if (codeDigits.value[index] === '' && index > 0) {
    nextTick(() => {
      if (codeRefs.value[index - 1]) {
        codeRefs.value[index - 1]?.focus();
      }
    });
  }
};
</script>

<template>
  <div class="code-container">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    <input
        v-for="(_, index) in codeDigits"
        :key="index"
        type="tel"
        id="code"
        inputmode="numeric"
        class="code-box"
        maxlength="1"
        v-model="codeDigits[index]"
        @input="onInput(index)"
        @keydown.backspace="onBackspace(index)"
        :ref="el => {codeRefs[index] = el as any}"
    />
  </div>
</template>

<style scoped>
  .code-container {
    display: flex;
    gap: 16px;
    justify-content: center;
  }

  .code-box {
    width: 40px;
    height: 48px;
    text-align: center;
    font-size: 32px;
    border-radius: 8px;
    border: 2px solid transparent;
    background-color: #eef1ff;
    outline: none;
    transition: border-color 0.2s ease-in-out;
  }

  .code-box:focus {
    border-color: var(--primary-500);
  }
</style>