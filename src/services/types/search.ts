import {
  AgeRequestType,
  ObservationType,
  SexType,
} from '@/services';

export type SearchParamsType = {
  phrase: string,
  age: AgeRequestType,
  sex?: SexType,
  maxResults?: number,
  types?: ObservationType[],
};

export type SearchResultType = {
  id: string,
  label: string,
};

export type SearchEvidenceType = {
  results: SearchResultType[]
};
