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
  RationaleResponse,
  RationaleRequest,
 } from '@/composables/types';

 export async function useRationale (requestBody: RationaleRequest) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const URI = new URL(`${import.meta.env.VITE_API}/rationale`);
  const response = ref<AxiosResponse<RationaleResponse> | null>(null);
  const error = ref<AxiosError | null>(null);
  const type = ref<RationaleResponse['type'] | null>(null);
  const observation_params = ref<RationaleResponse['observation_params'] | undefined>(undefined);
  const condition_params = ref<RationaleResponse['condition_params'] | undefined>(undefined);

  await engineApi.post(URI.toString(), requestBody)
    .then((res: AxiosResponse) => {
      response.value = res;
      type.value = res.data.type;
      observation_params.value = res.data.observation_params;
      condition_params.value = res.data.condition_params;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    type: type.value,
    observation_params: observation_params.value,
    condition_params: condition_params.value,
    error: error.value,
  }
}
