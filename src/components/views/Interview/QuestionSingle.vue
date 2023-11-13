<template>
  <UiSimpleQuestion
    v-model="modelValue"
    :items="items"
  />
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  type ComputedRef,
} from 'vue';
import {
  UiSimpleQuestion,
  type SimpleQuestionItem,
} from '@infermedica/component-library';
import {
  type QuestionItemsType,
} from '@/services/types';

type QuestionMultipleProps = {
  answers: QuestionItemsType[];
}

const props = defineProps<QuestionMultipleProps>();
const emit = defineEmits(['patient-evidence']);

const items: ComputedRef<SimpleQuestionItem[]> = computed(() => props.answers[0].choices.map(({ id, label }) => ({
  value: id,
  label,
  icon: label === 'Don\'t know' ? 'dont-know' : label?.toLocaleLowerCase(),
} as SimpleQuestionItem)));

const modelValue = ref('');

watch(modelValue, (value) => {
  emit('patient-evidence', value);
});

</script>
