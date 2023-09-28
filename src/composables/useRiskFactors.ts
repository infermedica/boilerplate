import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
import type { 
  RiskFactorType,
  RiskFactorsParams,
} from '@/composables/types';

export async function useRiskFactors ( params: RiskFactorsParams ) {
  const {
    age,
    enableTriage3,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  let response: AxiosResponse<RiskFactorType[]> | null = null;
  let error: AxiosError | null = null;
  let riskFactors: RiskFactorType[] = [];

  await engineApi.get('/risk_factors', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      'enable_triage_3': enableTriage3,
    }
  })
    .then((res: AxiosResponse<RiskFactorType[]>) => {
      response = res;
      riskFactors = res.data;
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    riskFactors,
    error: error,
  }
}
