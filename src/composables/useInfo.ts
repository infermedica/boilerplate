import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
import type { InfoType } from '@/composables/types';

export async function useInfo () {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse | null = null;
  let error: Error | AxiosError | null = null;
  let apiVersion: InfoType['apiVersion'] | undefined = undefined;
  let updatedAt: InfoType['updatedAt'] | null = null;
  let conditionsCount: InfoType['conditionsCount'] | null = null;
  let symptomsCount: InfoType['symptomsCount'] | null = null;
  let riskFactorsCount: InfoType['riskFactorsCount'] | null = null;
  let labTestsCount: InfoType['labTestsCount'] | null = null;

  await engineApi.get('/info')
    .then((res: AxiosResponse) => {
      response = res;
      apiVersion = res.data.api_version;
      updatedAt = res.data.updated_at;
      conditionsCount = res.data.conditions_count;
      symptomsCount = res.data.symptoms_count;
      riskFactorsCount = res.data.risk_factors_count;
      labTestsCount = res.data.lab_tests_count;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    apiVersion,
    updatedAt,
    conditionsCount,
    symptomsCount,
    riskFactorsCount,
    labTestsCount,
    error,
  }
}
