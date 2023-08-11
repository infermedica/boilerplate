import { 
  AgeUnitType,
  ExtrasType,
} from '@/composables/types';

export type EvidenceType = {
  id: string,
  choice_id: 'present' | 'absent' | 'unknown',
  observed_at?: string,
  source?: 'initial' | 'suggest' | 'predefined' | 'red_flags',
  duration?: {
    value: number,
    unit: 'week' | 'day' | 'hour' | 'minute',
  }
}

export type ConditionsItemType = {
  id: string,
  name: string,
  name_common: string,
  probability: number,
}

export type ChoicePresentType = {
  id: 'present',
  label: 'Yes',
}

export type ChoiceAbsentType = {
  id: 'absent',
  label: 'No',
}

export type ChoiceUnknownType = {
  id: 'unknown',
  label: 'Don\'t know',
}

export type QuestionItemsType = {
  id: string,
  name: string,
  choices: ChoicePresentType[] | ChoiceAbsentType[] | ChoiceUnknownType[],
}

export type QuestionType = {
  type: 'single' | 'group_single' | 'group_multiple',
  text: string,
  items: QuestionItemsType[],
  extras?: ExtrasType,
}

export type DiagnosisRequestBodyType = {
  sex: 'male' | 'female',
  age: {
    value: number,
    unit?: AgeUnitType, 
  },
  evidence?: EvidenceType[],
  evaluated_at?: string,
  extras?: ExtrasType,
}

export type DiagnosisResponseType = {
  question?: QuestionType,
  conditions?: ConditionsItemType[],
  extras?: ExtrasType,
  has_emergency_evidence?: boolean,
  should_stop?: boolean,
  interview_token?: string
}
