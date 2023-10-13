import type {
  SexType,
  AgeRequestType,
  EvidenceType,
} from '@/services';

export type PatientData = {
  sex: SexType;
  age: AgeRequestType;
  evidences: EvidenceType[];
}

export const patientData: PatientData = {
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
};
