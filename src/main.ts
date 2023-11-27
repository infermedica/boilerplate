import {
  createApp,
  reactive,
  provide,
  // inject,
  // readonly,
  type InjectionKey,
} from 'vue';
import '@infermedica/component-library/src/styles/styles.scss';
import App from './App.vue';
import { type PatientData } from './types/patientData';
import { type EvidenceType } from './services';

export type StateType = {
  isLoading: boolean;
  isSidePanelOpen: boolean;
  isSurveyFinish: boolean;
  patientData: PatientData;
}

export type GlobalStateType = {
  state: StateType;
  toogleIsLoading: (isLoaded: boolean) => void;
  toogleSidePanel: () => void;
  toogleIsSurveyFinish: (isFinish: boolean) => void;
  handleUpdatePatientEvidences: (evidences: EvidenceType[]) => void;
}

export const stateSymbol = Symbol('state') as InjectionKey<GlobalStateType>;
export const initialEvidences: EvidenceType[] = [
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

export const createState = () => {
  const state = reactive<StateType>({
    isLoading: false,
    isSidePanelOpen: false,
    isSurveyFinish: false,
    patientData: {
      sex: 'female',
      age: {
        value: 30,
      },
      evidences: initialEvidences,
    },
  });

  const toogleIsLoading = (isLoaded: boolean) => {
    state.isLoading = isLoaded;
  };

  const toogleSidePanel = () => {
    state.isSidePanelOpen = !state.isSidePanelOpen;
  };

  const toogleIsSurveyFinish = (isFinish: boolean) => {
    state.isSurveyFinish = isFinish;
  };

  const handleUpdatePatientEvidences = (evidences: EvidenceType[]) => {
    state.patientData.evidences = [...new Set(
      [...state.patientData.evidences, ...evidences],
    )];

    state.patientData.evidences = state.patientData.evidences.filter((evidence, index) => {
      const element = JSON.stringify(evidence);
      return index === state.patientData.evidences.findIndex((obj) => JSON.stringify(obj) === element);
    });

    toogleIsLoading(false);
  };

  return {
    state,
    toogleIsLoading,
    toogleSidePanel,
    toogleIsSurveyFinish,
    handleUpdatePatientEvidences,
  };
};

export const provideState = () => provide(stateSymbol, createState());

const app = createApp(App);
app.provide('state', createState());

app.mount('#app');
