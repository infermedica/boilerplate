import { 
  AgeRequestType,
  EvidenceType,
  ExtrasType,
  SexType,
} from "@/composables/types";

export type ExplanationRequest = {
  sex: SexType,
  age: AgeRequestType,
  evidence?: EvidenceType[],
  evaluated_at?: string,
  extras?: ExtrasType,
  target: string,
}

export type ExplanationEvidence = {
  id: string,
  name: string,
  common_name?: string,
}
