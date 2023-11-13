import {
  reactive,
} from 'vue';
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

// export const stateSymbol = Symbol('state') as InjectionKey<GlobalStateType>;

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
    state.patientData.evidences = [...new Set([...state.patientData.evidences, ...evidences])];
  };

  return {
    state,
    toogleIsLoading,
    toogleSidePanel,
    toogleIsSurveyFinish,
    handleUpdatePatientEvidences,
  };
};
