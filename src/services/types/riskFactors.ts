import {
  AgeRequestType,
  ExtrasType,
  SeriousObservationSeriousnessType,
  SexType,
} from '@/services';

export type RiskFactorType = {
  id: string;
  name: string;
  commonName?: string;
  sexFilter: SexType | 'both';
  category?: string;
  extras?: ExtrasType;
  imageUrl?: string;
  imageSource?: string;
  seriousness?: SeriousObservationSeriousnessType;
};

export type RiskFactorDetailsType = RiskFactorType & {
  question: string;
  questionThirdPerson?: string;
};

export type RiskFactorsParams = {
  age: AgeRequestType;
  enableTriage3?: boolean;
};

export type RiskFactorsByIdParams = RiskFactorsParams & {
  riskFactorsId: string;
};
