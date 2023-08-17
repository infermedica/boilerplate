import { 
  AgeUnitType,
  ExtrasType,
  SexType,
  SeriousObservationSeriousnessType,
 } from "@/composables/types";

export type ParentRelationType = 
  | 'base'
  | 'duration'
  | 'severity'
  | 'character'
  | 'exacerbating_factor'
  | 'diminishing_factor'
  | 'location'
  | 'radiation';

export type SymptomChildrenType = {
  id: string,
  parent_relation: ParentRelationType,
}

export type SymptomType = {
  id: string,
  name: string,
  common_name?: string,
  sex_filter: SexType | 'both',
  category?: string,
  extras?: ExtrasType,
  children: SymptomChildrenType[],
  image_url?: string,
  image_source?: string,
  parent_id?: string,
  parent_relation?: ParentRelationType,
}

export type SymptomDetailsType = SymptomType & {
  question: string,
  question_third_person?: string,
  // TODO: find in api models
  seriousness?: SeriousObservationSeriousnessType,
}

export type SymptomsParams = {
  age: number,
  ageUnit?: AgeUnitType,
  enableTriage3?: boolean,
}

export type SymptomsByIdParams = SymptomsParams & {
  symptomId: string,
}
