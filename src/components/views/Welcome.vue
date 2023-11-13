<template>
  <UiMessage
    title="Check your symptoms"
    illustration="boy"
    class="welcome-screen"
  >
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

    <PatientDetails />
    <UiButton
      id="welcome-screen-button"
      class="welcome-screen__button"
      @click="handleGoNext"
    >
      Next
    </UiButton>
  </UiMessage>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
} from 'vue';
import {
  UiBulletPoints,
  UiButton,
  UiMessage,
  UiText,
} from '@infermedica/component-library';
import UiBulletPointsItem from '@infermedica/component-library/src/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import PatientDetails from '../molecules/PatientDetails.vue';
import { type GlobalStateType } from '@/main';
import { type PatientData } from '@/types/patientData';

const { state } = inject<GlobalStateType>('state') as GlobalStateType;
const patientData = computed<PatientData>(() => state.patientData);

const emit = defineEmits(['getNextQuestion']);

const handleGoNext = () => {
  emit('getNextQuestion', patientData.value);
};
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
  --heading-margin-block-start: var(--space-32);

  min-height: 22.75rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-inline: var(--space-16);
  margin-top: var(--space-32);

  @media (min-width: 768px) {
    flex-direction: row;
    margin-inline: auto;
  }

  &__loader {
    position: absolute;
    inset: 0;
    z-index: 10;
  }

  &__text {
    margin-block: var(--space-12) var(--space-8);
  }

  &__button {
    margin: var(--space-32) auto var(--space-64);
    width: 100%;

    @media (min-width: 768px) {
      width: unset;
    }
  }
}
</style>
