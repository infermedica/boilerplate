import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  engineApiConfig,
  useSetAuthHeaders,
  type DiagnosisRequestType,
  type DiagnosisResponseType,
} from '@/services';

export async function useDiagnosis(requestBody: DiagnosisRequestType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<DiagnosisResponseType> | null = null;
  let error: AxiosError | null = null;
  let question: DiagnosisResponseType['question'] | undefined;
  let conditions: DiagnosisResponseType['conditions'] | undefined;
  let extras: DiagnosisResponseType['extras'] | undefined;
  let hasEmergencyEvidence: DiagnosisResponseType['hasEmergencyEvidence'] | undefined;
  let shouldStop: DiagnosisResponseType['shouldStop'] | undefined;
  let interviewToken: DiagnosisResponseType['interviewToken'] | undefined;

  await engineApi.post('/diagnosis', requestBody)
    .then((res: AxiosResponse<DiagnosisResponseType>) => {
      response = res;
      question = res.data.question;
      conditions = res.data.conditions;
      extras = res.data.extras;
      hasEmergencyEvidence = res.data.hasEmergencyEvidence;
      shouldStop = res.data.shouldStop;
      interviewToken = res.data.interviewToken;
    })
    .catch((err: AxiosError) => {
      error = err;
    });

  return {
    response,
    question,
    conditions,
    extras,
    hasEmergencyEvidence,
    shouldStop,
    interviewToken,
    error,
  };
}
