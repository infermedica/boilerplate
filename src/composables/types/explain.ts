import { DiagnosisRequestType } from "@/composables/types";

export type ExplanationRequestType = DiagnosisRequestType & {
  target: string,
}

export type ExplanationEvidenceType = {
  id: string,
  name: string,
  common_name?: string,
}

export type ExplanationResponseType = {
  supporting_evidence: ExplanationEvidenceType[],
  conflicting_evidence: ExplanationEvidenceType[],
  unconfirmed_evidence: ExplanationEvidenceType[],
}
