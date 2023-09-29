import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
  type SymptomType,
  type SymptomsParamsType,
} from '@/services';

export async function useSymptoms ( params: SymptomsParamsType ) {

  const {
    age,
    enableTriage3
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  let response: AxiosResponse<SymptomType[]> | null = null;
  let error: AxiosError | null = null;
  let symptoms: SymptomType[] = [];

  await engineApi.get('/symptoms', {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
    },
  })
    .then((res: AxiosResponse<SymptomType[]>) => {
      response = res;
      symptoms = res.data;
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    symptoms,
    error,
  }
}
