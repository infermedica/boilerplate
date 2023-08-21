import { 
  AgeRequestType,
  ExtrasType,
  SeriousObservationSeriousnessType,
  SexType,
 } from "@/composables/types";

 // TODO find correct type
 export type RiskFactorType = {
  id: string,
  name: string,
  common_name?: string,
  sex_filter: SexType | 'both',
  category?: string,
  extras?: ExtrasType,
  image_url?: string,
  image_source?: string,
  seriousness?: SeriousObservationSeriousnessType
}

export type RiskFactorDetailsType = RiskFactorType & {
  question: string,
  question_third_person?: string,
}

export type RiskFactorsParams = {
  age: AgeRequestType,
  enableTriage3?: boolean,
}

export type RiskFactorsByIdParams = RiskFactorsParams & {
  riskFactorsId: string,
}
