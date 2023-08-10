export type SearchParamsType = {
  phrase: string, 
  age: number, 
  ageUnit?: 'year' | 'month', 
  sex?: 'female' | 'male',
  maxResults?: number,
  types?: 'symptoms' | 'risk_factor' | 'lab_test' | 'condition', 
}

export type SearchResult = {
  id: string,
  label: string,
}

export type SearchEvidence = {
  results: SearchResult[]
}
