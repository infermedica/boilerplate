<template>
  <UiSimpleQuestion
    v-model="modelValue"
    :items="items"
  />
</template>

<script setup lang="ts">
import {
  computed, type ComputedRef, ref, watch,
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
const items: ComputedRef<SimpleQuestionItem[]> = computed(() => props.answers[0].choices.map(({ id, label }) => ({
  value: id,
  label,
  icon: label === 'Don\'t know' ? 'dont-know' : label?.toLocaleLowerCase(),
} as SimpleQuestionItem)));

const emit = defineEmits(['patient-evidence']);

// const items: SimpleQuestionItem[] = [
//   {
//     value: 'present',
//     label: 'Yes',
//     icon: 'yes',
//   },
//   {
//     value: 'absent',
//     label: 'No',
//     icon: 'no',
//   },
//   {
//     value: 'unknown',
//     label: 'Don\'t know',
//     icon: 'dont-know',
//   },
// ];
const modelValue = ref('');

watch(modelValue, (value) => {
  emit('patient-evidence', value);
});

</script>
