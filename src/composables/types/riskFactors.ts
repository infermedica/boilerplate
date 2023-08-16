import { 
ExtrasType,
  SexType,
 } from "@/composables/types";

export type RiskFactorsResponseType = {
  id: string,
  name: string,
  common_name?: string,
  question: string,
  question_third_person?: string,
  sex_filter: SexType | 'both',
  category?: string,
  extras: ExtrasType,
  image_url?: string,
  image_source?: string,
}
