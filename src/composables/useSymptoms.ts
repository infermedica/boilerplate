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
  SymptomType,
  SymptomsParamsType,
 } from './types';

export async function useSymptoms ( params: SymptomsParamsType ) {

  const {
    age,
    enableTriage3
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/symptoms`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const symptoms= ref<SymptomType[]>([]);

  URI.searchParams.append('age.value', age.value.toString());
  age.unit && URI.searchParams.append('age.unit', age.unit);
  enableTriage3 && URI.searchParams.append('enable_triage_3', enableTriage3.toString());

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      symptoms.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    symptoms: symptoms.value,
    error: error.value,
  }
}
