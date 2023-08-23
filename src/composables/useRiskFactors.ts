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
  RiskFactorType,
  RiskFactorsParams,
} from '@/composables/types';

export async function useRiskFactors ( params: RiskFactorsParams ) {
  const {
    age,
    enableTriage3,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const riskFactors = ref<RiskFactorType[]>([]);

  await engineApi.get('/risk_factors', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      'enable_triage_3': enableTriage3,
    }
  })
    .then((res: AxiosResponse) => {
      response.value = res;
      riskFactors.value =res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    riskFactors: riskFactors.value,
    error: error.value,
  }
}
