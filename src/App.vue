<template>
  <div class="app__wrapper">
    <Header
      @toogle-side-panel="handleToggleSidePanel"
    />
    <main class="app__container">
      <WelcomeScreen
        v-if="isWelcomePage"
        @get-next-question="handleGetNextQuestion"
      />
      <Question
        v-else
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
      <div v-if="isSurveyFinish">
        Finished survey
      </div>
    </main>
    <Footer />
    <SidePanel
      :is-side-panel-open="isSidePanelOpen"
      @toogle-side-panel="handleToggleSidePanel"
    />
  </div>
</template>

<script setup lang="ts">
import {
  // computed,
  ref,
  // watch,
} from 'vue';
import SidePanel from './components/SidePanel.vue';
import QuestionMultiple from './components/views/Interview/QuestionMultiple.vue';
import QuestionSingle from './components/views/Interview/QuestionSingle.vue';
import WelcomeScreen from '@/components/views/WelcomeScreen.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Question from '@/components/views/Interview/Question.vue';
import QuestionGroupSingle from '@/components/views/Interview/QuestionGroupSingle.vue';
import { type PatientData } from '@/patientData';
import {
  useDiagnosis,
  type ChoiceIdType,
  type QuestionType,
  type EvidenceType,
} from '@/services';

const currentQuestion = ref<QuestionType | undefined>(undefined);
const isWelcomePage = ref(true);
const isSidePanelOpen = ref(false);
const patientEvidence = ref<EvidenceType[]>([]);
const isSurveyFinish = ref(false);

const handleToggleSidePanel = () => {
  isSidePanelOpen.value = !isSidePanelOpen.value;
};

const handlePatientEvidences = (evidences: []) => {
  const answers = evidences.map<EvidenceType>((el, index) => ({
    id: currentQuestion.value?.items[index].id as string,
    choiceId: el,
  }));
  patientEvidence.value.push(...answers);
};

const handlePatientEvidenceGroupMultiple = (evidence: EvidenceType[]) => {
  patientEvidence.value.push(...evidence);
};

const handlePatientEvidenceSingle = (evidence: ChoiceIdType) => {
  const answer = {
    id: currentQuestion.value?.items[0].id as string,
    choiceId: evidence,
  };
  patientEvidence.value.push(answer);
};

const handleGetNextQuestion = async (patient: PatientData) => {
  const {
    sex,
    age: { value },
    evidences,
  } = patient;

  const { question, shouldStop } = await useDiagnosis({
    sex,
    age: {
      value,
    },
    evidence: [
      ...evidences,
      ...patientEvidence.value,
    ],
  });
  if (question) {
    currentQuestion.value = question;
    isWelcomePage.value = false;
  }
  if (shouldStop) isSurveyFinish.value = shouldStop;
};
</script>

<style lang="scss">
@import '~@infermedica/component-library/src/styles/styles.scss';
@import '@/styles/style.scss';

.app {
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    position: relative;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
}
</style>
