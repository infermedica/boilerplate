<template>
  <UiMultipleAnswer
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
  UiMultipleAnswer,
} from '@infermedica/component-library';
import {
  type EvidenceType,
  type QuestionItemsType,
} from '@/services/types';

type QuestionMultipleProps = {
  answers: QuestionItemsType[];
  handlePatientEvidences: (evidences: EvidenceType[]) => void;
}

const props = defineProps<QuestionMultipleProps>();
const modelValue = ref([]);
const items = computed(() => props.answers.map(({ id, name }) => ({
  id,
  label: name,
})));
const options = computed(() => props.answers[0]?.choices
  .map(({ id, label }) => ({ value: id, label })));

watch(modelValue, (value) => {
  const answer: EvidenceType[] = value.map(({ id }) => ({
    id,
    choiceId: 'present',
  }));
  props.handlePatientEvidences(answer);
});

</script>

