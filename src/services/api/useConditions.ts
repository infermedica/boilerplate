import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
  type  ConditionsParamsType, 
  type ConditionType, 
} from '@/services';

export async function useConditions(params: ConditionsParamsType) {
  const {
    age,
    enableTriage3,
    includeInternal,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<ConditionType[]> | null = null;
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
    .then((res: AxiosResponse<ConditionType[]>) => {
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
