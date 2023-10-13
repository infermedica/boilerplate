<template>
  <UiQuestion
    title="Are you planning to consult a medical professional?"
    class="question"
  >
    <slot />
    <template #actions-bottom>
      <UiButton class="question__action-button">
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

</script>

<style lang="scss">
.question {
  &__action-button {
    margin-top: var(--space-32)
  }
}
</style>
