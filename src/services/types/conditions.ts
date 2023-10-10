import {
  AcutenessType,
  AgeRequestType,
  PrevalenceType,
  RecommendedChannelType,
  SeverityType,
  SexType,
  TriageLevelType,
} from '@/services';

export type ConditionsParamsType = {
  age: AgeRequestType;
  enableTriage3?: boolean;
  includeInternal?: boolean;
};

export type ConditionType = {
  id: string;
  name: string;
  commonName?: string;
  sexFilter: SexType | 'both';
  categories: string[];
  prevalence: PrevalenceType;
  acuteness: AcutenessType;
  severity: SeverityType;
  extras?: {
    hint: string | null;
    icd10Code: string | null;
  };
  triageLevel: TriageLevelType;
  recommendedChannel: RecommendedChannelType;
};

export type ConditionsByIdParamsType = {
  conditionId: string;
  conditionsParams: ConditionsParamsType;
};
