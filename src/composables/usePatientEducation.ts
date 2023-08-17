import { ref } from 'vue';
import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
} from '@/composables';
import { SectionsType } from '@/composables/types';

export async function usePatientEducation (
  params: {
    conditionId: string,
    interviewToken: string,
    sections?: SectionsType[],
  }
) {

  const {
    conditionId,
    sections,
    interviewToken,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/patient_education/${conditionId}`);
  const response = ref<AxiosResponse | null>(null);
  const patient_education_document = ref({});
  const error = ref<AxiosError | null>(null);

  sections && URI.searchParams.append('sections', sections.join(','));

  await engineApi.get(URI.toString(), {
    headers: {
      'Interview-Token': interviewToken,
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'App-Id, App-Key, Content-Type, Interview-Token, Access-Control-Allow-Methods',
    }
  })
    .then((res: AxiosResponse) => {
      response.value = res;
      patient_education_document.value = res.data
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    patient_education_document: patient_education_document.value,
    error: error.value,
  }
}
