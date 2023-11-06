<template>
  <div
    class="welcome-screen"
  >
    <UiLoader v-if="isLoading" is-loading type="spinner" tag="div" class="welcome-screen__loader" />
    <template v-else>
      <UiMessage
        title="Check your symptoms"
        illustration="boy"
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

        <UiHeading level="4" class="welcome-screen__heading-about">
          Patient details and symptoms
        </UiHeading>

        <UiBulletPoints>
          <UiBulletPointsItem
            icon="checkmark"
            class="welcome-screen__bullet-point-item"
          >
            {{ capitalizeFirstLetter(sex) }}, {{ value }} year old
          </UiBulletPointsItem>
          <UiBulletPointsItem
            v-for="(item, index) in symptomsNames"
            :key="index"
            icon="checkmark"
            class="welcome-screen__bullet-point-item"
          >
            {{ item }}
          </UiBulletPointsItem>
        </UiBulletPoints>
        <UiButton
          id="welcome-screen-button"
          class="welcome-screen__button"
          @click="handleGoNext"
        >
          Next
        </UiButton>
      </UiMessage>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
} from 'vue';
import {
  UiBulletPoints,
  UiButton,
  UiHeading,
  UiMessage,
  UiLoader,
  UiText,
} from '@infermedica/component-library';
import UiBulletPointsItem from '@infermedica/component-library/src/components/molecules/UiBulletPoints/_internal/UiBulletPointsItem.vue';
import { patientData } from '@/patientData';
import { useDiagnosis, useSymptomsById } from '@/services';
import { capitalizeFirstLetter } from '@/helpers';

const {
  sex,
  age: { value },
  evidences,
} = patientData;

const symptomsNames = ref<unknown[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  symptomsNames.value = await Promise.all(evidences.map(async (evidence) => {
    const { name } = await useSymptomsById({
      symptomId: evidence.id,
      age: {
        value: 40,
      },
    });

    return name;
  }));
  isLoading.value = false;
});

const handleGoNext = async () => {
  await useDiagnosis({
    sex,
    age: {
      value,
    },
    evidence: evidences,
  });
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
  --bullet-points-item-marker-color: var(--color-icon-primary);

  width: var(--app-container-width);
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

  &__heading-about {
    margin-block: var(--space-24) var(--space-8);
  }

  &__button {
    margin-top: var(--space-32);
  }

}
</style>
