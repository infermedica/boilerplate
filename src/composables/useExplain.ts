import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
 } from '@/composables';
 import type {
  ExplanationRequestType,
  ExplanationResponseType,
 } from '@/composables/types';

 export async function useExplain (requestBody: ExplanationRequestType) {

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let supportingEvidence: ExplanationResponseType['supportingEvidence'] | null = null;
  let conflictingEvidence: ExplanationResponseType['conflictingEvidence'] | null = null;
  let unconfirmedEvidence: ExplanationResponseType['unconfirmedEvidence'] | null = null;

  await engineApi.post('/explain', requestBody)
  .then((res: AxiosResponse) => {
    response = res;
    supportingEvidence = res.data.supporting_evidence;
    conflictingEvidence = res.data.conflicting_evidence;
    unconfirmedEvidence = res.data.unconfirmed_evidence;
  })
  .catch((err: AxiosError) => error = err);

  return {
    response,
    supportingEvidence,
    conflictingEvidence,
    unconfirmedEvidence,
    error,
  }
}
