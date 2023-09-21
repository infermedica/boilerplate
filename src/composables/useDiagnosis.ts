import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
 } from '@/composables';
import type { 
  DiagnosisRequestType,
  DiagnosisResponseType,
} from '@/composables/types';

export async function useDiagnosis (requestBody: DiagnosisRequestType) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let question: DiagnosisResponseType['question'] | undefined = undefined;
  let conditions: DiagnosisResponseType['conditions'] | undefined = undefined;
  let extras: DiagnosisResponseType['extras'] | undefined = undefined;
  let hasEmergencyEvidence: DiagnosisResponseType['hasEmergencyEvidence'] | undefined = undefined;
  let shouldStop: DiagnosisResponseType['shouldStop'] | undefined = undefined;
  let interviewToken: DiagnosisResponseType['interviewToken'] | undefined = undefined;

  await engineApi.post('/diagnosis', requestBody)
    .then((res: AxiosResponse) => {
      response = res;
      question = res.data.question;
      conditions = res.data.conditions;
      extras = res.data.extras;
      hasEmergencyEvidence = res.data.has_emergency_evidence;
      shouldStop = res.data.should_stop;
      interviewToken = res.data.interview_token;

    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    question,
    conditions,
    extras,
    hasEmergencyEvidence,
    shouldStop,
    interviewToken,
    error,
  }
}
