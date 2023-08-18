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
  const URI = new URL(`${import.meta.env.VITE_API}/explain`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const supportingEvidence = ref<ExplanationResponseType['supporting_evidence'] | null>(null);
  const conflictingEvidence = ref<ExplanationResponseType['conflicting_evidence'] | null>(null);
  const unconfirmedEvidence = ref<ExplanationResponseType['unconfirmed_evidence'] | null>(null);

  await engineApi.post(URI.toString(), requestBody)
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
