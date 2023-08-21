import { 
  AcutenessType,
  AgeRequestType,
  ExtrasType,
  EvidenceType,
  SexType,
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

export enum ChoiceId {
  Absent = 'absent',
  Present = 'present',
  Unknown = 'unknown',
}

export type ChoiceType = {
  id: ChoiceId;
  label: string;
}

export type QuestionItemsType = {
  id: string,
  name: string,
  choices: ChoiceType[],
}

export enum QuestionTypes {
  GroupMultiple = 'group_multiple',
  GroupSingle = 'group_single',
  Single = 'single',
  Duration = 'duration'
}

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
