import { ref } from 'vue';
import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
} from '@/composables';
import type { InfoType } from '@/composables/types';

export async function useInfo () {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const URI = new URL(`${import.meta.env.VITE_API}/info`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<Error | AxiosError | null>(null);
  const api_version = ref<InfoType['api_version'] | undefined>(undefined);
  const updated_at = ref<InfoType['updated_at'] | undefined>(undefined);
  const conditions_count = ref<InfoType['conditions_count'] | undefined>(undefined);
  const symptoms_count = ref<InfoType['symptoms_count'] | undefined>(undefined);
  const risk_factors_count = ref<InfoType['risk_factors_count'] | undefined>(undefined);
  const lab_tests_count = ref<InfoType['lab_tests_count'] | undefined>(undefined);

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      api_version.value = res.data.api_version;
      updated_at.value = res.data.updated_at;
      conditions_count.value = res.data.conditions_count;
      symptoms_count.value = res.data.symptoms_count;
      risk_factors_count.value = res.data.risk_factors_count;
      lab_tests_count.value = res.data.lab_tests_count;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    api_version: api_version.value,
    updated_at: updated_at.value,
    conditions_count: conditions_count.value,
    symptoms_count: symptoms_count.value,
    risk_factors_count: risk_factors_count.value,
    lab_tests_count: lab_tests_count.value,
    error: error.value,
  }
}
