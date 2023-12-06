<template>
  <main class="main">
    <template
      v-for="view in templateContents"
      :key="view.name"
    >
      <component
        :is="view.component"
        v-if="view.name === currentComponent"
        v-bind="view.props"
        @update-evidences="handleUpdate"
        @update-survey-should-stop="handleShouldStop"
      >
        <template #submit>
          <UiButton
            @click="handleGetDiagnosis"
          >
            Next
          </UiButton>
        </template>
      </component>
    </template>
  </main>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  ref,
  type Component,
} from 'vue';
import { UiButton } from '@infermedica/component-library';
import Welcome from '@/components/Welcome/Welcome.vue';
import Diagnosis from '@/components/Diagnosis/Diagnosis.vue';
import Results from '@/components/Results/Results.vue';
import {
  type EvidenceType,
  type ObjectValues,
} from '@/services';
import { type PatientData } from '@/App.vue';

const CONTENT = {
  DIAGNOSIS: 'diagnosis',
  RESULTS: 'results',
  WELCOME: 'welcome',
} as const;

type ContentType = ObjectValues<typeof CONTENT>;

const patientData = inject('patientData') as PatientData;

const currentComponent = ref<ContentType>(CONTENT.WELCOME);

const handleUpdate = (evidences: EvidenceType[]) => {
  if (patientData) {
    patientData.evidences = [...new Set(
      [...patientData.evidences, ...evidences],
    )];
  }
};

const templateContents = computed<{
  name: ContentType;
  component: Component;
  props?: Record<string, unknown>;
}[]>(() => [
  {
    name: CONTENT.DIAGNOSIS,
    component: Diagnosis,
    props: {
      patientData,
    },
  },
  { name: CONTENT.RESULTS, component: Results },
  { name: CONTENT.WELCOME, component: Welcome },
]);

const handleGetDiagnosis = () => {
  currentComponent.value = CONTENT.DIAGNOSIS;
};

const handleShouldStop = () => {
  currentComponent.value = CONTENT.RESULTS;
};

</script>

<style lang="scss">
.main {
  width: var(--app-container-width);

  @media (min-width: 768px) {
    margin-inline: auto;
  }
}
</style>
