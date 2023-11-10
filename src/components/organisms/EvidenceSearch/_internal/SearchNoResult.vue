<template>
  <div class="search-no-results">
    <div class="search-no-results__icon-section">
      <UiIcon
        icon="sad"
        class="search-no-results__icon"
      />
    </div>

    <div class="search-no-results__content">
      <UiHeading
        level="4"
        class="search-no-results__header"
      >
        {{ noResultsNotification.header }}
      </UiHeading>
      <UiText class="search-no-results__text">
        {{ noResultsNotification.text }}
      </UiText>
      <UiBulletPoints class="search-no-results__points" :items="noResultsNotification.bulletPoints" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UiBulletPoints,
  UiHeading,
  UiIcon,
  UiText,
} from '@infermedica/component-library';

const noResultsNotification = {
  header: 'No results',
  text: 'Unfortunately, the symptom was not found.',
  bulletPoints: [
    'Please try to enter single words',
    'Keep in mind, that you can only select symptoms from the autocomplete list',
  ],
};
</script>

<style lang="scss">
.search-no-results {
  margin: var(--space-16) var(--space-24);
  display: flex;

  &__icon-section {
    --icon-size: var(--no-results-header-icon-size, 1.5rem);
    --icon-color: var(--no-results-header-icon-color, var(--color-icon-secondary));

    margin-right: 12px;
  }

  &__header {
    font-weight: 600;
  }

  &__text {
    --text-margin-block: var(--space-8);
  }
}
</style>
