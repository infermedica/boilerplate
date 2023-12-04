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
        @get-next-question="handleGetNextQuestion(patientData)"
      >
        <template #submit>
          <UiButton
            @click="handleGetNextQuestion(patientData)"
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
  ref,
  type Component,
} from 'vue';
import { UiButton } from '@infermedica/component-library';
import Welcome from '@/components/Welcome/Welcome.vue';
import Diagnosis from '@/components/Diagnosis/Diagnosis.vue';
import Results from '@/components/Results/Results.vue';
import {
  getDiagnosis,
  type EvidenceType,
  type QuestionType,
  type ObjectValues,
} from '@/services';
import { type PatientData } from '@/App.vue';

const CONTENT = {
  DIAGNOSIS: 'diagnosis',
  RESULTS: 'results',
  WELCOME: 'welcome',
} as const;

type ContentType = ObjectValues<typeof CONTENT>;

type MainProps = {
  patientData: PatientData;
}

const props = defineProps<MainProps>();

const patientData = computed(() => props.patientData);
const currentQuestion = ref<QuestionType | null>(null);
const currentComponent = ref<ContentType>(CONTENT.WELCOME);

const handleUpdate = (evidences: EvidenceType[]) => {
  patientData.value.evidences = [...new Set(
    [...patientData.value.evidences, ...evidences],
  )];
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
      currentQuestion: currentQuestion.value,
      patientData: patientData.value,
    },
  },
  { name: CONTENT.RESULTS, component: Results, props: { patientData: patientData.value } },
  { name: CONTENT.WELCOME, component: Welcome, props: { patientData: patientData.value } },
]);

const handleGetNextQuestion = async (patient: PatientData) => {
  const {
    sex,
    age: { value },
    evidences,
  } = patient;

  const { question, shouldStop } = await getDiagnosis({
    sex,
    age: {
      value,
    },
    evidence: [
      ...evidences,
    ],
  });

  if (question) {
    currentQuestion.value = question;
    currentComponent.value = CONTENT.DIAGNOSIS;
  }

  if (shouldStop) currentComponent.value = CONTENT.RESULTS;
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
