import { 
  AcutenessType,
  AgeUnitType,
  ExtrasType,
  PrevalenceType,
  RecommendedChannelType,
  SeverityType,
  SexType,
  TriageLevelType,
} from '@/composables/types';

export type ConditionsParamsType = {
  age: number,
  ageUnit?: AgeUnitType, 
  enableTriage3?: boolean,
  includeInternal?: boolean,
}

export type ConditionType = {
  id: string,
  name: string,
  common_name?: string,
  sex_filter?: SexType,
  categories: string[],
  prevalence?: PrevalenceType,
  acuteness?: AcutenessType,
  severity?: SeverityType,
  extras?: ExtrasType,
  triage_level?: TriageLevelType,
  recommended_channel?: RecommendedChannelType,
}
