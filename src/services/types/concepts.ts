export type ConceptItemModelTypesType = 'condition' | 'symptom' | 'risk_factor' | 'lab_test';

export type ConceptItemModelType = {
  id?: string;
  type?: ConceptItemModelTypesType;
  name?: string;
  commonName?: string;
};

export type ConceptsParamsType = {
  ids?: string[];
  types?: ConceptItemModelTypesType[];
};

export type ConceptsByIdParamsType = {
  conceptsId: string;
};
