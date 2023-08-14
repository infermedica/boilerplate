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
  ExplanationEvidence,
  ExplanationRequest,
 } from '@/composables/types';

 export async function useExplain (requestBody: ExplanationRequest) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  const URI = new URL(`${import.meta.env.VITE_API}/explain`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const supporting_evidence = ref<ExplanationEvidence | null>(null);
  const conflicting_evidence = ref<ExplanationEvidence | null>(null);
  const unconfirmed_evidence = ref<ExplanationEvidence | null>(null);

  await engineApi.post(URI.toString(), requestBody)
  .then((res: AxiosResponse) => {
    response.value = res;
    supporting_evidence.value = res.data.supporting_evidence;
    conflicting_evidence.value = res.data.conflicting_evidence;
    unconfirmed_evidence.value = res.data.unconfirmed_evidence;
  })
  .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    supporting_evidence: supporting_evidence.value,
    conflicting_evidence: conflicting_evidence.value,
    unconfirmed_evidence: unconfirmed_evidence.value,
    error: error.value,
  }
}
