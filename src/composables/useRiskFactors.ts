import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
} from '@/composables';
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

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let riskFactors: RiskFactorType[] = [];

  await engineApi.get('/risk_factors', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      'enable_triage_3': enableTriage3,
    }
  })
    .then((res: AxiosResponse) => {
      response = res;
      riskFactors =res.data;
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    riskFactors,
    error: error,
  }
}
