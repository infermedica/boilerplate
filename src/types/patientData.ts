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
