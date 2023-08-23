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
  RationaleResponseType,
  DiagnosisRequestType,
 } from '@/composables/types';

 export async function useRationale (requestBody: DiagnosisRequestType) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const response = ref<AxiosResponse<RationaleResponseType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const type = ref<RationaleResponseType['type'] | null>(null);
  const observationParams = ref<RationaleResponseType['observation_params'] | undefined>(undefined);
  const conditionParams = ref<RationaleResponseType['condition_params'] | undefined>(undefined);

  await engineApi.post('/rationale', requestBody)
    .then((res: AxiosResponse) => {
      response.value = res;
      type.value = res.data.type;
      observationParams.value = res.data.observation_params;
      conditionParams.value = res.data.condition_params;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    type: type.value,
    observationParams: observationParams.value,
    conditionParams: conditionParams.value,
    error: error.value,
  }
}
