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

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const symptoms= ref<SymptomType[]>([]);

  await engineApi.get('/symptoms', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
    },
  })
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
