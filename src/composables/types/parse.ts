import {
  AgeRequestType,
  ChoiceIdType,
  ObjectValues,
  ObservationType,
  SexType,
} from '@/composables/types';

export type MentionType = {
  id: string,
  name: string,
  common_name?: string,
  orth?: string,
  choice_id: ChoiceIdType,
  type: ObservationType,
  positions?: number[],
  head_position?: number,
}

const CONCEPTS = {
  SYMPTOM: 'symptom',
  RISK_FACTOR: 'risk_factor',
} as const;

export type ConceptsTypes = ObjectValues<typeof CONCEPTS>;

export type ParseRequestType = {
  age: AgeRequestType,
  sex?: SexType,
  text: string,
  context?: string[],
  include_tokens?: boolean,
  correct_spelling?: boolean,
  concept_types?: ConceptsTypes[],
}

export type ParseResponseType = {
  mentions: MentionType[],
  obvious: boolean,
  tokens?: string[],
}
