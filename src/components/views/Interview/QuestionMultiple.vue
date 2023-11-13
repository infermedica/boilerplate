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
  type QuestionItemsType,
} from '@/services/types';

type QuestionMultipleProps = {
  answers: QuestionItemsType[];
}

const props = defineProps<QuestionMultipleProps>();
const emit = defineEmits(['patient-evidence']);
const modelValue = ref([]);
const items = computed(() => props.answers.map(({ id, name }) => ({
  id,
  label: name,
})));
const options = computed(() => props.answers[0]?.choices
  .map(({ id, label }) => ({ value: id, label })));

watch(modelValue, (value) => {
  const answer = value.map(({ id }) => ({
    id,
    choiceId: 'present',
  }));
  emit('patient-evidence', answer);
});

</script>

<style lang="scss">
.question {
  &__action-button {
    margin-top: var(--space-32)
  }
}
</style>
