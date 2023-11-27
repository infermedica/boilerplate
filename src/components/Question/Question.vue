<template>
  <UiQuestion
    :title="title"
    class="question"
  >
    <slot />
    <template #actions-bottom>
      <UiButton
        class="question__action-button"
        @click="handleGoNext"
      >
        Next
      </UiButton>
    </template>
  </UiQuestion>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import {
  UiButton,
  UiQuestion,
} from '@infermedica/component-library';
import { type GlobalStateType } from '@/main';
import { type PatientData } from '@/types/patientData';

const { state } = inject<GlobalStateType>('state') as GlobalStateType;
const patientData = computed<PatientData>(() => state.patientData);

type QuestionProps = {
  title?: string;
}

withDefaults(defineProps<QuestionProps>(), {
  title: '',
});
const emit = defineEmits(['getNextQuestion']);

const handleGoNext = () => {
  emit('getNextQuestion', patientData.value);
};
</script>

<style lang="scss">
.question {
    width: var(--app-container-width);

    @media (min-width: 768px) {
      margin-top: var(--space-12);
    }

  &__action-button {
    margin-top: var(--space-32)
  }
}
</style>
