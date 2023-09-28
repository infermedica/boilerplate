import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
import type {
  ExplanationRequestType,
  ExplanationResponseType,
 } from '@/composables/types';

 export async function useExplain (requestBody: ExplanationRequestType) {

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  let response: AxiosResponse<ExplanationResponseType> | null = null;
  let error: AxiosError | null = null;
  let supportingEvidence: ExplanationResponseType['supportingEvidence'] | null = null;
  let conflictingEvidence: ExplanationResponseType['conflictingEvidence'] | null = null;
  let unconfirmedEvidence: ExplanationResponseType['unconfirmedEvidence'] | null = null;

  await engineApi.post('/explain', requestBody)
  .then((res: AxiosResponse<ExplanationResponseType>) => {
    response = res;
    supportingEvidence = res.data.supportingEvidence;
    conflictingEvidence = res.data.conflictingEvidence;
    unconfirmedEvidence = res.data.unconfirmedEvidence;
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
