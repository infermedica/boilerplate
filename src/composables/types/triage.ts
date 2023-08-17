import type {
  SeriousObservationSeriousnessType,
  TriageLevelType,
} from '@/composables/types';

export type SeriousObservationType = {
  id: string,
  name: string,
  common_name?: string,
  seriousness?: SeriousObservationSeriousnessType,
  is_emergency?: boolean,
}

export type TriageResponseType = {
  triage_level?: TriageLevelType,
  serious?: SeriousObservationType[],
  root_cause?: string,
  teleconsultation_applicable?: boolean,
}
