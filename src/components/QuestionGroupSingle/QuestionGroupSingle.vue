<template>
  <UiMultipleChoices
    v-model="modelValue"
    :items="items"
    :options="options"
    name="group-single"
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
import type { MultipleChoicesItemAttrsProps } from '@infermedica/component-library/src/components/organisms/UiMultipleChoices/_internal/UiMultipleChoicesItem.vue';
import {
  type ChoiceIdType,
  type QuestionItemsType,
} from '@/services/types';

type QuestionGroupSingleProps = {
  answers: QuestionItemsType[];
  handlePatientEvidences: (evidences: ChoiceIdType[]) => void;
}

const props = defineProps<QuestionGroupSingleProps>();

const items = computed<MultipleChoicesItemAttrsProps[]>(
  () => (props.answers as QuestionItemsType[]).map(({ id, name }) => ({
    id,
    label: name,
  })),
);

const options = computed(() => props.answers && props.answers[0]?.choices
  .map(({ id, label }) => ({ value: id, label })));

const modelValue = ref([]);

// const modelValue = computed<ChoiceIdType[]>({
//   get: () => [],
//   set: (newValue, oldValue) => {
//     console.log('newValue', newValue);
//     props.handlePatientEvidences(newValue);
//   },
// });

watch(modelValue, (value) => {
  props.handlePatientEvidences(value);
});

</script>

