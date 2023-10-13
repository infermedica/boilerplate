<template>
  <div class="app-container">
    <Question>
      <QuestionGroupSingle />
    </Question>
  </div>
</template>

<script setup lang="ts">
import Question from './components/views/Interview/Question.vue';
import QuestionGroupSingle from './components/views/Interview/QuestionGroupSingle.vue';

</script>

<style lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';

.app-container {
  --app-container-width: 42.5rem;

  margin: var(--space-32) auto;
  width: var(--app-container-width);
}
</style>
