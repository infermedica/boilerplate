export type SectionsType = 
  | 'summary'
  | 'how_its_defines'
  | 'how_its_cased'
  | 'how_its_diagnosed'
  | 'how_it_can_be_treated_at_home'
  | 'how_its_prevented'
  | 'when_to_see_professional'
  | 'disclaimer'
  | 'sources';

  export type PatientEducationParams = {
    conditionId: string,
    interviewToken: string,
    sections?: SectionsType[],
  }
