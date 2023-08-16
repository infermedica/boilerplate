import { ExtrasType, SexType } from "@/composables/types";

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

export type SymptomDetailsType = {
  id: string,
  name: string,
  common_name?: string,
  question: string,
  question_third_person?: string,
  sex_filter: SexType | 'both',
  category?: string,
  seriousness?: string, // TODO: find type
  extras?: ExtrasType,
  children?: SymptomChildrenType[],
  image_url?: string,
  image_source?: string,
  parent_id?: string,
  parent_relation?: ParentRelationType,
}
