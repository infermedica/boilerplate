import type { 
AgeRequestType,
  EvidenceType,
  ExtrasType,
  SexType,
} from '@/composables/types'

export type SuggestResult = {
  id: string,
  name: string,
  common_name?: string,
}

export type SuggestMethod = 'symptoms' | 'demographic_risk_factors' | 'evidence_based_risk_factors' | 'red_flags';

export type SuggestRequest = {
  sex: SexType,
  age: AgeRequestType,
  evidence?: EvidenceType[],
  evaluated_at?: string,
  extras: ExtrasType,
  suggest_method?: SuggestMethod,
}
