import { ref } from 'vue';
import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
} from '@/composables';
import { 
  PatientEducationParamsType,
  PatientEducationType,
} from '@/composables/types';

export async function usePatientEducation ( params: PatientEducationParamsType ) {

  const {
    conditionId,
    sections,
    interviewToken,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/patient_education/${conditionId}`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const patient_education_document = ref<PatientEducationType | {}>({});

  sections && URI.searchParams.append('sections', sections.join(','));

  await engineApi.get(URI.toString(), {
    headers: {
      'Interview-Token': interviewToken,
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
