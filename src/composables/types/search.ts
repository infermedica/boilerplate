import { 
  AgeUnitType,
  SexType,
} from '@/composables/types';

export type SearchParamsType = {
  phrase: string, 
  age: number, 
  ageUnit?: AgeUnitType, 
  sex?: Omit<SexType, 'both'>,
  maxResults?: number,
  types?: 'symptoms' | 'risk_factor' | 'lab_test' | 'condition', 
}

export type SearchResultType = {
  id: string,
  label: string,
}

export type SearchEvidenceType = {
  results: SearchResultType[]
}
