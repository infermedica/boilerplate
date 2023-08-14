import { 
  AgeUnitType,
  ObservationType,
  SexType,
} from '@/composables/types';

export type SearchParamsType = {
  phrase: string, 
  age: number, 
  ageUnit?: AgeUnitType, 
  sex?: Omit<SexType, 'both'>,
  maxResults?: number,
  types?: ObservationType, 
}

export type SearchResultType = {
  id: string,
  label: string,
}

export type SearchEvidenceType = {
  results: SearchResultType[]
}
