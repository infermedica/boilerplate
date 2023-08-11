import { AgeUnitType } from '@/composables/types';

export type SearchParamsType = {
  phrase: string, 
  age: number, 
  ageUnit?: AgeUnitType, 
  sex?: 'female' | 'male',
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
