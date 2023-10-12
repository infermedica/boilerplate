<template>
  <div
    class="welcome-screen"
  >
    <div class="welcome-screen__column-left">
      <UiHeading>Check your symptoms</UiHeading>
      <UiText class="welcome-screen__text">
        This is an example presents how easy create an application using only Infermedica products:
      </UiText>
      <UiBulletPoints>
        <UiBulletPointsItem>
          Triage Api
        </UiBulletPointsItem>
        <UiBulletPointsItem>
          Component Library
        </UiBulletPointsItem>
      </UiBulletPoints>
      <UiHeading level="4" class="welcome-screen__heading-about">
        Patient details and symptoms
      </UiHeading>
      <UiBulletPoints>
        <UiBulletPointsItem
          icon="checkmark"
        >
          Woman, 20 year old
        </UiBulletPointsItem>
        <UiBulletPointsItem
          icon="checkmark"
        >
          Symptom 1
        </UiBulletPointsItem>
        <UiBulletPointsItem
          icon="checkmark"
        >
          Symptom 2
        </UiBulletPointsItem>
      </UiBulletPoints>
      <UiButton class="welcome-screen__button">
        Next
      </UiButton>
    </div>
    <div class="welcome-screen__column-right">
      <UiIcon icon="boy" class="welcome-screen__icon" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  UiButton,
  UiHeading,
  UiIcon,
  UiText,
  UiBulletPoints,
} from '@infermedica/component-library';
import UiBulletPointsItem from '@infermedica/component-library/src/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';

</script>

<style lang="scss">
.welcome-screen {
  --boy-skin: #f0d7bf;
  --boy-hair: #bf9b6f;
  --boy-background: #f1eff0;
  --boy-shirt: #b2746e;
  --boy-undershirt: #7e6865;
  --boy-browser-page-header: #d9a491;
  --boy-browser-page-button-outline: #d9baba;
  --boy-browser-page-icon: #d9baba;
  --boy-browser: #ddd;
  --boy-laptop: #51636e;
  --boy-laptop-logo: #91a5b1;
  --bullet-points-item-marker-color: var(--color-icon-primary);

  width: 42.5rem;
  min-height: 22.75rem;
  margin: var(--space-32) auto;
  display: flex;
  justify-content: space-between;

  &__text {
    margin-block: var(--space-12) var(--space-8);
  }

  &__heading-about {
    margin-block: var(--space-24) var(--space-8);
  }

  &__button {
    margin-top: var(--space-32);
  }

  &__icon {
    width: var(--icon-size, 17.5rem);
    height: var(--icon-size, 13.125rem);
  }
}
</style>
