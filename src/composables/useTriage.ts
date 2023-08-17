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
  
  const URI = new URL(`${import.meta.env.VITE_API}/triage`);
  const response = ref<AxiosResponse<TriageResponseType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const triage_level = ref<TriageResponseType['triage_level'] | undefined>(undefined);
  const serious = ref<TriageResponseType['serious'] | undefined>(undefined);
  const root_cause = ref<TriageResponseType['root_cause'] | undefined>(undefined);
  const teleconsultation_applicable = ref<TriageResponseType['teleconsultation_applicable'] | undefined>(undefined);

  await engineApi.post(URI.toString(), request)
    .then((res: AxiosResponse) => {
      response.value = res;
      triage_level.value = res.data.triage_level;
      serious.value = res.data.serious;
      root_cause.value = res.data.root_cause;
      teleconsultation_applicable.value = res.data.teleconsultation_applicable;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    triage_level: triage_level.value,
    serious: serious.value,
    root_cause: root_cause.value,
    teleconsultation_applicable: teleconsultation_applicable.value,
    error: error.value,
  }
 }
