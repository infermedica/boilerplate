<template>
  <UiSimpleQuestion
    v-model="modelValue"
    :items="items"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiSimpleQuestion,
  type SimpleQuestionItem,
} from '@infermedica/component-library';

const items: SimpleQuestionItem[] = [
  {
    value: 'present',
    label: 'Yes',
    icon: 'yes',
  },
  {
    value: 'absent',
    label: 'No',
    icon: 'no',
  },
  {
    value: 'unknown',
    label: 'Don\'t know',
    icon: 'dont-know',
  },
];

const modelValue = ref('');
</script>
