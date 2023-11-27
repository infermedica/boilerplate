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
  type QuestionItemsType,
} from '@/services/types';

type QuestionGroupSingleProps = {
  answers: QuestionItemsType[];
}

const props = defineProps<QuestionGroupSingleProps>();
const emit = defineEmits(['patient-evidence']);
const items = computed<MultipleChoicesItemAttrsProps[]>(() => props.answers.map(({ id, name }) => ({
  id,
  label: name,
})));
const options = computed(() => props.answers[0]?.choices
  .map(({ id, label }) => ({ value: id, label })));

const modelValue = ref([]);

watch(modelValue, (value) => {
  emit('patient-evidence', value);
});

</script>

