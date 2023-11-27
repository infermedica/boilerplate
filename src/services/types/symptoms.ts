import {
  AgeRequestType,
  ExtrasType,
  SexType,
  SeriousObservationSeriousnessType,
} from '@/services';

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
  id: string;
  parentRelation: ParentRelationType;
};

export type SymptomType = {
  id: string;
  name: string;
  commonName?: string;
  sexFilter: SexType | 'both';
  category?: string;
  extras?: ExtrasType;
  children?: SymptomChildrenType[];
  imageUrl?: string;
  imageSource?: string;
  parentId?: string;
  parentRelation?: ParentRelationType;
};

export type SymptomDetailsType = SymptomType & {
  question: string;
  questionThirdPerson?: string;
  seriousness?: SeriousObservationSeriousnessType;
};

export type SymptomsParamsType = {
  age: AgeRequestType;
  enableTriage3?: boolean;
};

export type SymptomsByIdParams = SymptomsParamsType & {
  symptomId: string;
};
