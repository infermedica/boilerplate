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

export type PatientEducationParamsType = {
  conditionId: string;
  interviewToken: string;
  sections?: SectionsType[];
};

type NodeType =
  | 'paragraph'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'link'
  | 'text'
  | 'unordered-list'
  | 'ordered-list'
  | 'list-item';

export type Node = {
  content?: Node[];
  name?: string;
  nodeType: NodeType;
  target?: string;
  value?: string;
  title?: Node;
};

export type PatientEducationType = {
  [key: string]: Node | Node[];
};
