import {
  AgeRequestType,
  ChoiceIdType,
  ObjectValues,
  ObservationType,
  SexType,
} from '@/services';

export type MentionType = {
  id: string,
  name: string,
  commonName?: string,
  orth?: string,
  choiceId: ChoiceIdType,
  type: ObservationType,
  positions?: number[],
  headPosition?: number,
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
  includeTokens?: boolean,
  correctSpelling?: boolean,
  conceptTypes?: ConceptsTypes[],
}

export type ParseResponseType = {
  mentions: MentionType[],
  obvious: boolean,
  tokens?: string[],
}
