import type {
  SeriousObservationSeriousnessType,
  TriageLevelType,
} from '@/services';

export type SeriousObservationType = {
  id: string;
  name: string;
  commonName?: string;
  seriousness?: SeriousObservationSeriousnessType;
  isEmergency?: boolean;
};

export type TriageResponseType = {
  triageLevel?: TriageLevelType;
  serious?: SeriousObservationType[];
  rootCause?: string;
  teleconsultationApplicable?: boolean;
};
