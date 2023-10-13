<template>
  <UiMultipleAnswer
    v-model="modelValue"
    :items="items"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiMultipleAnswer,
} from '@infermedica/component-library';

const modelValue = ref([]);
const items = [
  'Seconds to minutes',
  'A few minutes to 4 hours',
  '4 hours to 3 days',
];
</script>

<style lang="scss">
.question {
  &__action-button {
    margin-top: var(--space-32)
  }
}
</style>
