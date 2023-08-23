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
  ConditionsParamsType, 
  ConditionType,
} from '@/composables/types';

export async function useConditions(params: ConditionsParamsType) {
  const {
    age,
    enableTriage3,
    includeInternal,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const conditions = ref<ConditionType[] | null>(null);

  await engineApi.get('/conditions', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
      include_internal: includeInternal,
    }
  })
    .then((res: AxiosResponse) => {
      response.value = res;
      conditions.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    conditions: conditions.value, 
    error: error.value,
  }
}
