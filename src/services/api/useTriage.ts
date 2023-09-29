import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
  type DiagnosisRequestType,
  type TriageResponseType,
} from '@/services';

 export async function useTriage (request: DiagnosisRequestType) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  let response: AxiosResponse<TriageResponseType> | null = null;
  let error: AxiosError | null = null;
  let triageLevel: TriageResponseType['triageLevel'] | undefined = undefined;
  let serious: TriageResponseType['serious'] | undefined = undefined;
  let rootCause: TriageResponseType['rootCause'] | undefined = undefined;
  let teleconsultationApplicable: TriageResponseType['teleconsultationApplicable'] | undefined = undefined;

  await engineApi.post('/triage', request)
    .then((res: AxiosResponse<TriageResponseType>) => {
      response = res;
      triageLevel = res.data.triageLevel;
      serious = res.data.serious;
      rootCause = res.data.rootCause;
      teleconsultationApplicable = res.data.teleconsultationApplicable;
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
