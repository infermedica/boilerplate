import type { DiagnosisRequestType } from '@/services';

export type SuggestResult = {
  id: string,
  name: string,
  commonName?: string,
};

export type SuggestMethod =
  | 'symptoms'
  | 'demographic_risk_factors'
  | 'evidence_based_risk_factors'
  | 'red_flags';

export type SuggestRequest = DiagnosisRequestType & {
  suggestMethod?: SuggestMethod,
};

export type SuggestParams = {
  request: SuggestRequest,
  maxResults?: number
};
