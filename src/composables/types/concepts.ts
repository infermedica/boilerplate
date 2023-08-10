export type ConceptItemModelType = 'condition' | 'symptom' | 'risk_factor' | 'lab_test';

export type ConceptItemModel = {
  id?: string,
  type?: ConceptItemModelType,
  name?: string,
  common_name?: string
}

export type ConceptsParamType = {
  ids?: string[],
  types?: ConceptItemModelType[],
}
