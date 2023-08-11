import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useSetAuthHeaders } from '@/composables/useSetAuthHeaders';
import { engineApiConfig } from '@/composables/engineApiConfig';
import { 
  DiagnosisRequestBodyType,
  DiagnosisResponseType,
} from '@/composables/types';

export async function useDiagnosis (requestBody: DiagnosisRequestBodyType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  const URI = new URL(`${import.meta.env.VITE_API}/diagnosis`);
  const data = ref<DiagnosisResponseType[] | []>([]);
  const error = ref<Error | AxiosError | null>(null);

  await engineApi.post(URI.toString(), requestBody)
    .then((response) => {
      data.value = response.data;
    })
    .catch((error: Error | AxiosError) => error = error);

  return {
    data: data.value, 
    error: error.value,
  }
}
