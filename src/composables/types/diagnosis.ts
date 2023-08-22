import { 
  AcutenessType,
  AgeRequestType,
  ExtrasType,
  EvidenceType,
  SexType,
  ObjectValues,
  PrevalenceType,
  SeverityType,
  TriageLevelType,
} from '@/composables/types';

export type ConditionDetailsModelCategoryType = {
  id?: string,
  name?: string,
}

export type ConditionDetailsModelType = {
  icd10_code?: string,
  category?: ConditionDetailsModelCategoryType,
  prevalence?: PrevalenceType,
  severity?: SeverityType,
  acuteness?: AcutenessType,
  triage_level?: TriageLevelType,
  hint?: string,
  has_patient_education?: boolean,
}

export type ConditionProbabilityType = {
  id: string,
  name: string,
  common_name?: string,
  probability: number,
  condition_details?: ConditionDetailsModelType,
}

const CHOICE_ID = {
  ABSENT: 'absent',
  PRESENT: 'present',
  UNKNOWN: 'unknown',
} as const;

export type ChoiceIdType = ObjectValues<typeof CHOICE_ID>

export type ChoiceType = {
  id: ChoiceIdType;
  label: string;
}

export type QuestionItemsType = {
  id: string,
  name: string,
  choices: ChoiceType[],
}

const QUESTION = {
  GROUP_MULTIPLE: 'group_multiple',
  GROUP_SINGLE: 'group_single',
  SINGLE: 'single',
  DURATION: 'duration',
} as const;

export type QuestionTypes = ObjectValues<typeof QUESTION>;

export type QuestionType = {
  type?: QuestionTypes,
  text: string,
  items: QuestionItemsType[],
  extras?: ExtrasType,
}

export type DiagnosisRequestType = {
  sex: SexType,
  age: AgeRequestType,
  evidence?: EvidenceType[],
  evaluated_at?: string,
  extras?: ExtrasType,
}

export type DiagnosisResponseType = {
  question?: QuestionType,
  conditions?: ConditionProbabilityType[],
  extras?: ExtrasType,
  has_emergency_evidence?: boolean,
  should_stop?: boolean,
  interview_token?: string
}
