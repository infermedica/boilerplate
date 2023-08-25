import type { 
  AcutenessType,
  AgeRequestType,
  ChoiceIdType,
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
  icd10Code?: string,
  category?: ConditionDetailsModelCategoryType,
  prevalence?: PrevalenceType,
  severity?: SeverityType,
  acuteness?: AcutenessType,
  triageLevel?: TriageLevelType,
  hint?: string,
  has_patient_education?: boolean,
}

export type ConditionProbabilityType = {
  id: string,
  name: string,
  commonName?: string,
  probability: number,
  conditionDetails?: ConditionDetailsModelType,
}

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
  evaluatedAt?: string,
  extras?: ExtrasType,
}

export type DiagnosisResponseType = {
  question?: QuestionType,
  conditions?: ConditionProbabilityType[],
  extras?: ExtrasType,
  hasEmergencyEvidence?: boolean,
  shouldStop?: boolean,
  interviewToken?: string
}
