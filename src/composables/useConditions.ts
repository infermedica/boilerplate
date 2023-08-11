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
    ageUnit, 
    enableTriage3,
    includeInternal,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const URI = new URL(`${import.meta.env.VITE_API}/conditions`);
  const response = ref<AxiosResponse | null>(null);
  const conditionsList = ref<ConditionType[] | [] | null>(null);
  const error = ref<AxiosError | null>(null);

  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  enableTriage3 !== undefined && URI.searchParams.append('enable_triage_3', `${enableTriage3}`);
  includeInternal !== undefined && URI.searchParams.append('include_internal', `${includeInternal}`);

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      conditionsList.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    conditionsList: conditionsList.value, 
    error: error.value,
  }
}
