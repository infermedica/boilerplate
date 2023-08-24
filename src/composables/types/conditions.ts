import { 
  AcutenessType,
  AgeRequestType,
  PrevalenceType,
  RecommendedChannelType,
  SeverityType,
  SexType,
  TriageLevelType,
} from '@/composables/types';

export type ConditionsParamsType = {
  age: AgeRequestType,
  enableTriage3?: boolean,
  includeInternal?: boolean,
}

export type ConditionType = {
  id: string,
  name: string,
  common_name?: string,
  sex_filter: SexType | 'both',
  categories: string[],
  prevalence: PrevalenceType,
  acuteness: AcutenessType,
  severity: SeverityType,
  extras?: {
    hint: string | null,
    icd10_code: string | null
  },
  triage_level: TriageLevelType,
  recommended_channel: RecommendedChannelType,
}

export type ConditionsByIdParamsType = {
  conditionId: string, 
  conditionsParams: ConditionsParamsType,
}
