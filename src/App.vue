<template>
  <div class="app__wrapper">
    <Header
      @toogle-side-panel="toogleSidePanel"
    />
    <main class="app__main">
      <UiLoader
        :is-loading="isLoading"
        class="app__loader"
      >
        <Welcome
          v-if="isWelcomePage"
          @get-next-question="handleGetNextQuestion"
        />

        <div
          v-else-if="!isSurveyFinish"
          class="app__container"
        >
          <aside class="app__aside">
            <PatientDetails />
          </aside>
          <Question
            :title="currentQuestion?.text"
            @get-next-question="handleGetNextQuestion"
          >
            <QuestionGroupSingle
              v-if="currentQuestion?.type === 'group_single'"
              :answers="currentQuestion?.items"
              @patient-evidence="handlePatientEvidences"
            />
            <QuestionMultiple
              v-if="currentQuestion?.type === 'group_multiple'"
              :answers="currentQuestion?.items"
              @patient-evidence="handlePatientEvidenceGroupMultiple"
            />
            <QuestionSingle
              v-if="currentQuestion?.type === 'single'"
              :answers="currentQuestion?.items"
              @patient-evidence="handlePatientEvidenceSingle"
            />
          </Question>
        </div>

        <Results v-if="isSurveyFinish" />
      </UiLoader>
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
  ref,
  inject,
} from 'vue';
import { UiLoader } from '@infermedica/component-library';
import Welcome from '@/components/views/Welcome.vue';
import Question from '@/components/views/Question.vue';
import Results from '@/components/views/Results.vue';
import QuestionGroupSingle from '@/components/views/Interview/QuestionGroupSingle.vue';
import QuestionMultiple from '@/components/views/Interview/QuestionMultiple.vue';
import QuestionSingle from '@/components/views/Interview/QuestionSingle.vue';
import SidePanel from '@/components/organisms/SidePanel.vue';
import Header from '@/components/molecules/Header.vue';
import Footer from '@/components/molecules/Footer.vue';
import PatientDetails from '@/components/molecules/PatientDetails.vue';
import {
  useDiagnosis,
  type ChoiceIdType,
  type QuestionType,
  type EvidenceType,
} from '@/services';
import { type PatientData } from '@/types/patientData';
import { type GlobalStateType } from '@/main';

const {
  state,
  toogleSidePanel,
  toogleIsLoading,
  toogleIsSurveyFinish,
  handleUpdatePatientEvidences,
} = inject<GlobalStateType>('state') as GlobalStateType;

const currentQuestion = ref<QuestionType | undefined>(undefined);
const isWelcomePage = ref(true);
const isSidePanelOpen = computed(() => state.isSidePanelOpen);
const isLoading = computed(() => state.isLoading);
const isSurveyFinish = computed(() => state.isSurveyFinish);

const handlePatientEvidences = (evidences: []) => {
  const answers = evidences.map<EvidenceType>((evidence, index) => ({
    id: currentQuestion.value?.items[index].id as string,
    choiceId: evidence,
  }));

  handleUpdatePatientEvidences(answers);
};

const handlePatientEvidenceGroupMultiple = (evidences: EvidenceType[]) => {
  handleUpdatePatientEvidences(evidences);
};

const handlePatientEvidenceSingle = (evidence: ChoiceIdType) => {
  const answer = {
    id: currentQuestion.value?.items[0].id as string,
    choiceId: evidence,
  };

  handleUpdatePatientEvidences([answer]);
};

const handleGetNextQuestion = async (patient: PatientData) => {
  const {
    sex,
    age: { value },
    evidences,
  } = patient;

  toogleIsLoading(true);

  const { question, shouldStop } = await useDiagnosis({
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
    isWelcomePage.value = false;
  }

  toogleIsLoading(false);

  if (shouldStop) toogleIsSurveyFinish(shouldStop);
};
</script>

<style lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';
@import '@/styles/style.scss';

.app {
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

  &__loader {
    position: fixed;
    inset: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: var(--space-32) var(--space-20);
    gap: var(--space-32);

    @media (min-width: 768px) {
      max-width: var(--app-container-width);
      flex-direction: row;
      align-items: flex-start;
      margin: var(--space-32) var(--space-20);
      margin-inline: auto;
      gap: var(--space-40);
    }
  }

  &__aside {
    @media (min-width: 768px) {
      max-width: 12.5rem;
      margin-top: var(--space-12);
    }
  }
}
</style>
