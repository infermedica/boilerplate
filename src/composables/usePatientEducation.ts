import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
import type { 
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

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let patientEducationDocument: PatientEducationType | {} = {};

  await engineApi.get(`/patient_education/${conditionId}`, {
    headers: {
      'Interview-Token': interviewToken,
    },
    params: {
      sections: sections?.join(','),
    }
  })
    .then((res: AxiosResponse) => {
      response = res;
      patientEducationDocument = res.data
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    patientEducationDocument,
    error,
  }
}
