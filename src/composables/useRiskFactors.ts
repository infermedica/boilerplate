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

  const URI = new URL(`${import.meta.env.VITE_API}/risk_factors`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const riskFactors = ref<RiskFactorType[]>([]);

  URI.searchParams.append('age.value', age.value.toString());
  age.unit && URI.searchParams.append('age.unit', age.unit);
  enableTriage3 && URI.searchParams.append('enable_triage_3', enableTriage3.toString());

  await engineApi.get(URI.toString())
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
