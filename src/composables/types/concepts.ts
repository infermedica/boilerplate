export type ConceptItemModelTypesType = 'condition' | 'symptom' | 'risk_factor' | 'lab_test';

export type ConceptItemModelType = {
  id?: string,
  type?: ConceptItemModelTypesType,
  name?: string,
  common_name?: string
}

export type ConceptsParamsType = {
  ids?: string[],
  types?: ConceptItemModelType[],
}

export type ConceptsByIdParamsType = {
  id: string,
}
