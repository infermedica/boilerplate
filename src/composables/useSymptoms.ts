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
  SymptomDetailsType,
 } from './types';

export async function useSymptoms (
  params: {
    age: number,
    ageUnit?: AgeUnitType,
    enableTriage3?: boolean,
  }
) {

  const {
    age,
    ageUnit,
    enableTriage3
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/symptoms`);
  const response = ref<AxiosResponse<SymptomDetailsType> | null>(null);
  const symptomslist= ref<SymptomDetailsType[]>([]);
  const error = ref<AxiosError | null>(null);

  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  enableTriage3 && URI.searchParams.append('enable_triage_3', enableTriage3.toString());

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      symptomslist.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    symptomslist: symptomslist.value,
    error: error.value,
  }
}
