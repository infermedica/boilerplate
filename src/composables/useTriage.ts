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
  DiagnosisRequestType,
  TriageResponseType,
 } from '@/composables/types';

 export async function useTriage (request: DiagnosisRequestType) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const response = ref<AxiosResponse<TriageResponseType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const triageLevel = ref<TriageResponseType['triage_level'] | undefined>(undefined);
  const serious = ref<TriageResponseType['serious'] | undefined>(undefined);
  const rootCause = ref<TriageResponseType['root_cause'] | undefined>(undefined);
  const teleconsultationApplicable = ref<TriageResponseType['teleconsultation_applicable'] | undefined>(undefined);

  await engineApi.post('/triage', request)
    .then((res: AxiosResponse) => {
      response.value = res;
      triageLevel.value = res.data.triage_level;
      serious.value = res.data.serious;
      rootCause.value = res.data.root_cause;
      teleconsultationApplicable.value = res.data.teleconsultation_applicable;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    triageLevel: triageLevel.value,
    serious: serious.value,
    rootCause: rootCause.value,
    teleconsultationApplicable: teleconsultationApplicable.value,
    error: error.value,
  }
 }
