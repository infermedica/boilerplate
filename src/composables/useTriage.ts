import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
import type { 
  DiagnosisRequestType,
  TriageResponseType,
 } from '@/composables/types';

 export async function useTriage (request: DiagnosisRequestType) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  let response: AxiosResponse<TriageResponseType> | null = null;
  let error: AxiosError | null = null;
  let triageLevel: TriageResponseType['triageLevel'] | undefined = undefined;
  let serious: TriageResponseType['serious'] | undefined = undefined;
  let rootCause: TriageResponseType['rootCause'] | undefined = undefined;
  let teleconsultationApplicable: TriageResponseType['teleconsultationApplicable'] | undefined = undefined;

  await engineApi.post('/triage', request)
    .then((res: AxiosResponse) => {
      response = res;
      triageLevel = res.data.triage_level;
      serious = res.data.serious;
      rootCause = res.data.root_cause;
      teleconsultationApplicable = res.data.teleconsultation_applicable;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    triageLevel,
    serious,
    rootCause,
    teleconsultationApplicable,
    error,
  }
 }
