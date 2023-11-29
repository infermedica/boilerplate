<template>
  <div class="default__wrapper">
    <Header
      @toogle-side-panel="toogleSidePanel"
    />
    <main class="default__main">
      <template
        v-for="view in templateContents"
        :key="view.name"
      >
        <component
          :is="view.component"
          v-if="view.name === currentComponent"
          v-bind="view.props"
          @update-evidences="handleUpdate"
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
    <Footer />
    <SidePanel
      :is-side-panel-open="isSidePanelOpen"
      @toogle-side-panel="toogleSidePanel"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  ref,
  type Component,
} from 'vue';
import { UiButton } from '@infermedica/component-library';
import Welcome from '@/components/Welcome/Welcome.vue';
import Diagnosis from '@/components/Diagnosis/Diagnosis.vue';
import Results from '@/components/Results/Results.vue';
import SidePanel from '@/components/SidePanel/SidePanel.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import {
  getDiagnosis,
  type AgeRequestType,
  type SexType,
  type EvidenceType,
  type QuestionType,
  type ObjectValues,
} from '@/services';

export type PatientData = {
  sex: SexType;
  age: AgeRequestType;
  evidences: EvidenceType[];
}

const CONTENT = {
  DIAGNOSIS: 'diagnosis',
  RESULTS: 'results',
  WELCOME: 'welcome',
} as const;

type ContentType = ObjectValues<typeof CONTENT>;

const currentQuestion = ref<QuestionType | undefined>(undefined);
const isSidePanelOpen = ref(false);

const patientData = reactive<PatientData>({
  sex: 'female',
  age: {
    value: 30,
  },
  evidences: [
    {
      id: 's_1193',
      choiceId: 'present',
      source: 'initial',
    },
    {
      id: 's_488',
      choiceId: 'present',
    },
    {
      id: 's_418',
      choiceId: 'present',
    },
  ],
});
const handleUpdate = (evidences: EvidenceType[]) => {
  patientData.evidences = [...new Set(
    [...patientData.evidences, ...evidences],
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
      patientData,
    },
  },
  { name: CONTENT.RESULTS, component: Results, props: undefined },
  { name: CONTENT.WELCOME, component: Welcome, props: { patientData } },
]);

const currentComponent = ref<ContentType>(CONTENT.WELCOME);

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

const toogleSidePanel = () => { isSidePanelOpen.value = !isSidePanelOpen.value; };

</script>

<style lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';
@import '@/styles/style.scss';

.default {
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }

  &__main {
    width: var(--app-container-width);
    @media (min-width: 768px) {
      margin-inline: auto;
    }
  }
}
</style>
