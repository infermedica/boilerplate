import { 
  AgeRequestType,
  ExtrasType,
  SexType,
 } from "@/composables/types";

 export type RiskFactorType = {
  id: string,
  name: string,
  common_name?: string,
  sex_filter: SexType | 'both',
  category?: string,
  extras?: ExtrasType,
  image_url?: string,
  image_source?: string,
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
