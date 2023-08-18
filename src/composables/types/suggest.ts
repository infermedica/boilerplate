import type { DiagnosisRequestType } from '@/composables/types'

export type SuggestResult = {
  id: string,
  name: string,
  common_name?: string,
}

export type SuggestMethod = 
  | 'symptoms' 
  | 'demographic_risk_factors' 
  | 'evidence_based_risk_factors' 
  | 'red_flags';

export type SuggestRequest = DiagnosisRequestType & {
  suggest_method?: SuggestMethod,
}

export type SuggestParams = {
  request: SuggestRequest, 
  maxResults?: number
}
