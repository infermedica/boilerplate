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
        :title="currentQuestion?.text"
        @get-next-question="handleGetNextQuestion"
      >
        <QuestionGroupSingle
          v-if="currentQuestion?.type === 'group_single'"
          :answers="currentQuestion?.items"
          @patient-evidence="handlePatientEvidences"
        />
      </Question>
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
import WelcomeScreen from '@/components/views/WelcomeScreen.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Question from '@/components/views/Interview/Question.vue';
import QuestionGroupSingle from '@/components/views/Interview/QuestionGroupSingle.vue';
import { type PatientData } from '@/patientData';
import {
  useDiagnosis,
  type QuestionType,
  type EvidenceType,
} from '@/services';

const currentQuestion = ref<QuestionType | undefined>(undefined);
const isWelcomePage = ref(true);
const isSidePanelOpen = ref(false);
const patientEvidence = ref<EvidenceType[]>([]);

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

const handleGetNextQuestion = async (patient: PatientData) => {
  const {
    sex,
    age: { value },
    evidences,
  } = patient;

  const { question } = await useDiagnosis({
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
