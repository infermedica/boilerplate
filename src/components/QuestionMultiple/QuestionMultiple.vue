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
  ref,
  watch,
} from 'vue';
import {
  UiMultipleChoices,
} from '@infermedica/component-library';
import {
  type EvidenceType,
  type QuestionItemsType,
} from '@/services';

type QuestionMultipleProps = {
  answers?: QuestionItemsType[];
  handlePatientEvidences?: (evidences: Record<string, unknown>[]) => void;
}

const OPTIONS = {
  absent: 'No',
  present: 'Yes',
  unknown: 'Don\'t know',
} as const;

const props = defineProps<QuestionMultipleProps>();

const modelValue = ref<EvidenceType[]>([]);
const items = computed(() => props.answers && props.answers.map(({ name }) => ({
  label: name,
})));
const options = computed(() => props.answers && props.answers[0]?.choices
  .map(({ id }) => ({ value: id, label: OPTIONS[id] })));

watch(modelValue, (value: Record<string, unknown>[]) => {
  const answer = value.map((choice, index) => ({
    id: props.answers && props.answers[index].id,
    choiceId: choice,
  }));

  if (props.handlePatientEvidences) props.handlePatientEvidences(answer);
});

</script>

