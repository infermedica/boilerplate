<template>
  <UiSimpleQuestion
    v-model="modelValue"
    :items="items"
  />
</template>

<script setup lang="ts">
import {
  computed,
  type ComputedRef,
} from 'vue';
import {
  UiSimpleQuestion,
  type SimpleQuestionItem,
} from '@infermedica/component-library';
import {
  type ChoiceIdType,
  type QuestionItemsType,
} from '@/services';

type QuestionMultipleProps = {
  answers?: QuestionItemsType[];
  userAnswer: ChoiceIdType | '';
  handlePatientEvidences?: (evidence: ChoiceIdType) => void;
}

const props = defineProps<QuestionMultipleProps>();

const items: ComputedRef<SimpleQuestionItem[] | undefined> = computed(
  () => props.answers && props.answers[0].choices.map(({ id, label }) => ({
    value: id,
    label,
    icon: label === 'Don\'t know' ? 'dont-know' : label?.toLocaleLowerCase(),
  } as SimpleQuestionItem)),
);

const modelValue = computed({
  get: () => props.userAnswer,
  set: (value) => {
    if (value && props.handlePatientEvidences) props.handlePatientEvidences(value);
  },
});

</script>
