<template>
  <UiMultipleChoices
    v-model="modelValue"
    :items="items"
    :options="options"
  />
</template>

<script setup lang="ts">
import {
  computed,
} from 'vue';
import {
  UiMultipleChoices,
} from '@infermedica/component-library';
import {
  type QuestionItemsType,
} from '@/services';

type QuestionMultipleProps = {
  answers?: QuestionItemsType[];
  userAnswers: Record<string, unknown>[];
  handlePatientEvidences?: (evidences: Record<string, unknown>[]) => void;
}

const OPTIONS = {
  absent: 'No',
  present: 'Yes',
  unknown: 'Don\'t know',
} as const;

const props = defineProps<QuestionMultipleProps>();

const modelValue = computed({
  get: () => props.userAnswers,
  set: (value) => {
    if (props.handlePatientEvidences) props.handlePatientEvidences(value);
  },
});

const items = computed(() => props.answers && props.answers.map(({ name }) => ({
  label: name,
})));

const options = computed(() => props.answers && props.answers[0]?.choices
  .map(({ id }) => ({ value: id, label: OPTIONS[id] })));

</script>

