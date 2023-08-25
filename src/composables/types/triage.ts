import type {
  SeriousObservationSeriousnessType,
  TriageLevelType,
} from '@/composables/types';

export type SeriousObservationType = {
  id: string,
  name: string,
  commonName?: string,
  seriousness?: SeriousObservationSeriousnessType,
  isEmergency?: boolean,
}

export type TriageResponseType = {
  triageLevel?: TriageLevelType,
  serious?: SeriousObservationType[],
  rootCause?: string,
  teleconsultationApplicable?: boolean,
}
