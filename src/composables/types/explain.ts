import { DiagnosisRequestType } from "@/composables/types";

export type ExplanationRequestType = DiagnosisRequestType & {
  target: string,
}

export type ExplanationEvidenceType = {
  id: string,
  name: string,
  commonName?: string,
}

export type ExplanationResponseType = {
  supportingEvidence: ExplanationEvidenceType[],
  conflictingEvidence: ExplanationEvidenceType[],
  unconfirmedEvidence: ExplanationEvidenceType[],
}
