<template>
  <UiMultipleAnswer
    v-model="modelValue"
    :items="items"
    :options="options"
    :hint="'Select one answer'"
    name="group-single"
  />
</template>

<script setup lang="ts">
import {
  computed,
} from 'vue';
import {
  UiMultipleAnswer,
} from '@infermedica/component-library';
import type { MultipleChoicesItemAttrsProps } from '@infermedica/component-library/src/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import {
  type QuestionItemsType,
} from '@/services';

type QuestionGroupSingleProps = {
  answers?: QuestionItemsType[] | [];
  userAnswer: Record<string, unknown>;
  handlePatientEvidences?: (evidences: Record<string, unknown>) => void;
}

const props = withDefaults(defineProps<QuestionGroupSingleProps>(), {
  answers: () => [],
  handlePatientEvidences: () => {},
});

const items = computed<MultipleChoicesItemAttrsProps[]>(
  () => (props.answers as QuestionItemsType[]).map(({ id, name }) => ({
    id,
    label: name,
  })),
);

const options = computed(() => props.answers && props.answers[0]?.choices
  .map(({ id, label }) => ({ value: id, label })));

const modelValue = computed({
  get: () => (props.userAnswer),
  set: (value) => {
    if (props.handlePatientEvidences) {
      props.handlePatientEvidences(value);
    }
  },
});

</script>

