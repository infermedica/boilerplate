import {
  AgeRequestType,
  ChoiceIdType,
  ObservationType,
  SexType,
} from '@/composables/types';

// TODO: find model in API for this type
export type MentionType = {
  id: string,
  name: string,
  common_name?: string,
  orth?: string,
  choice_id: ChoiceIdType,
  type: ObservationType,
  positions: number[],
  head_position: number,
}

export type ParseRequestType = {
  age: AgeRequestType,
  sex?: SexType,
  text: string,
  context?: string[],
  include_tokens?: boolean,
  correct_spelling?: boolean,
  concept_types?: string[],
}

export type ParseResponseType = {
  mentions: MentionType[],
  obvious: boolean,
  tokens: string[],
}
