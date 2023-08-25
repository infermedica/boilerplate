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

  const response = ref<AxiosResponse | null>(null);
  const error = ref<Error | AxiosError | null>(null);
  const apiVersion = ref<InfoType['apiVersion'] | undefined>(undefined);
  const updatedAt = ref<InfoType['updatedAt'] | null>(null);
  const conditionsCount = ref<InfoType['conditionsCount'] | null>(null);
  const symptomsCount = ref<InfoType['symptomsCount'] | null>(null);
  const riskFactorsCount = ref<InfoType['riskFactorsCount'] | null>(null);
  const labTestsCount = ref<InfoType['labTestsCount'] | null>(null);

  await engineApi.get('/info')
    .then((res: AxiosResponse) => {
      response.value = res;
      apiVersion.value = res.data.api_version;
      updatedAt.value = res.data.updated_at;
      conditionsCount.value = res.data.conditions_count;
      symptomsCount.value = res.data.symptoms_count;
      riskFactorsCount.value = res.data.risk_factors_count;
      labTestsCount.value = res.data.lab_tests_count;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    apiVersion: apiVersion.value,
    updatedAt: updatedAt.value,
    conditionsCount: conditionsCount.value,
    symptomsCount: symptomsCount.value,
    riskFactorsCount: riskFactorsCount.value,
    labTestsCount: labTestsCount.value,
    error: error.value,
  }
}
