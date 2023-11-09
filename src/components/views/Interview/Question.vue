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
  UiButton,
  UiQuestion,
} from '@infermedica/component-library';
import { patientData } from '@/patientData';

type QuestionProps = {
  title?: string;
}

withDefaults(defineProps<QuestionProps>(), {
  title: '',
});
const emit = defineEmits(['getNextQuestion']);

const handleGoNext = () => {
  emit('getNextQuestion', patientData);
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
