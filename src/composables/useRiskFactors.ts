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
  AgeUnitType,
  RiskFactorsResponseType,
} from '@/composables/types';

export async function useRiskFactors (params: {
  age: number,
  ageUnit?: AgeUnitType,
  enable_triage_3?: boolean,
}) {
  const {
    age,
    ageUnit,
    enable_triage_3,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/risk_factors`);
  const response = ref<AxiosResponse<RiskFactorsResponseType> | null>(null);
  const riskFactorsList= ref<RiskFactorsResponseType[]>([]);
  const error = ref<AxiosError | null>(null);

  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  enable_triage_3 && URI.searchParams.append('enable_triage_3', enable_triage_3.toString());

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      riskFactorsList.value =res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    riskFactorsList: riskFactorsList.value,
    error: error.value,
  }
}
