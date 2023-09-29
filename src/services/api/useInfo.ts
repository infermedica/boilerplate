import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
  type InfoType,
} from '@/services';

export async function useInfo () {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<InfoType> | null = null;
  let error: Error | AxiosError | null = null;
  let apiVersion: InfoType['apiVersion'] | undefined = undefined;
  let updatedAt: InfoType['updatedAt'] | null = null;
  let conditionsCount: InfoType['conditionsCount'] | null = null;
  let symptomsCount: InfoType['symptomsCount'] | null = null;
  let riskFactorsCount: InfoType['riskFactorsCount'] | null = null;
  let labTestsCount: InfoType['labTestsCount'] | null = null;

  await engineApi.get('/info')
    .then((res: AxiosResponse<InfoType>) => {
      response = res;
      apiVersion = res.data.apiVersion;
      updatedAt = res.data.updatedAt;
      conditionsCount = res.data.conditionsCount;
      symptomsCount = res.data.symptomsCount;
      riskFactorsCount = res.data.riskFactorsCount;
      labTestsCount = res.data.labTestsCount;
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
