<template>
  <div class="app__wrapper">
    <Header
      @toogle-side-panel="toogleSidePanel"
    />
    <main class="app__main">
      <template v-for="view in templateContents" :key="view.name">
        <component
          :is="view.component"
          v-if="view.name === currentComponent"
          v-bind="view.props"
        />
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
  ref,
  type ComputedRef,
} from 'vue';
import Welcome from '@/components/Welcome/Welcome.vue';
import Question from '@/components/Question/Question.vue';
import Results from '@/components/Results/Results.vue';
import SidePanel from '@/components/SidePanel/SidePanel.vue';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
// import PatientDetails from '@/components/PatientDetails/PatientDetails.vue';
import { AgeRequestType, SexType, EvidenceType } from '@/services';

export type PatientData = {
  patientData: {
    sex: SexType;
    age: AgeRequestType;
    evidences: EvidenceType[];
  };
}

const isSidePanelOpen = ref(false);
const initialEvidences: EvidenceType[] = [
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
];
const patientData: ComputedRef<PatientData> = computed(() => ({
  patientData: {
    sex: 'female',
    age: {
      value: 30,
    },
    evidences: initialEvidences,
  },
}));
const templateContents = computed(() => [
  { name: 'welcome', component: Welcome, props: patientData },
  { name: 'results', component: Results },
  // TODO: title as dynamic props from getDiagnosis
  { name: 'question', component: Question, props: { title: 'title' } },
]);
const currentComponent = computed(() => 'results');

const toogleSidePanel = () => { isSidePanelOpen.value = !isSidePanelOpen.value; };

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
