import { ref } from 'vue';
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
  
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const supportingEvidence = ref<ExplanationResponseType['supportingEvidence'] | null>(null);
  const conflictingEvidence = ref<ExplanationResponseType['conflictingEvidence'] | null>(null);
  const unconfirmedEvidence = ref<ExplanationResponseType['unconfirmedEvidence'] | null>(null);

  await engineApi.post('/explain', requestBody)
  .then((res: AxiosResponse) => {
    response.value = res;
    supportingEvidence.value = res.data.supporting_evidence;
    conflictingEvidence.value = res.data.conflicting_evidence;
    unconfirmedEvidence.value = res.data.unconfirmed_evidence;
  })
  .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    supportingEvidence: supportingEvidence.value,
    conflictingEvidence: conflictingEvidence.value,
    unconfirmedEvidence: unconfirmedEvidence.value,
    error: error.value,
  }
}
