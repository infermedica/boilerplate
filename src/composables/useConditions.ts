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

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let conditions: ConditionType[] | null = null;

  await engineApi.get('/conditions', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
      include_internal: includeInternal,
    }
  })
    .then((res: AxiosResponse) => {
      response = res;
      conditions = res.data;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    conditions, 
    error,
  }
}
