<template>
  <UiMultipleAnswer
    v-model="modelValue"
    :items="items"
    name="group-single"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  UiMultipleAnswer,
} from '@infermedica/component-library';

const items = [
  {
    label: 'Fatigue',
    value: 'fatigue',
  },
  {
    label: 'Fever',
    value: 'fever',
  },
  {
    label: 'Illusion of surrounding objects being bigger or smaller than they actually are',
    value: 'illusion',
  },
];

const modelValue = ref({});
</script>

