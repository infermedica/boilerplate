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
  DiagnosisResponseType,
} from '@/composables/types';

export async function useDiagnosis (requestBody: DiagnosisRequestType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  const URI = new URL(`${import.meta.env.VITE_API}/diagnosis`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const question = ref<DiagnosisResponseType['question'] | undefined>(undefined);
  const conditions = ref<DiagnosisResponseType['conditions'] | undefined>(undefined);
  const extras = ref<DiagnosisResponseType['extras'] | undefined>(undefined);
  const has_emergency_evidence = ref<DiagnosisResponseType['has_emergency_evidence'] | undefined>(undefined);
  const should_stop = ref<DiagnosisResponseType['should_stop'] | undefined>(undefined);
  const interview_token = ref<DiagnosisResponseType['interview_token'] | undefined>(undefined);

  await engineApi.post(URI.toString(), requestBody)
    .then((res: AxiosResponse) => {
      response.value = res;
      question.value = res.data.question;
      conditions.value = res.data.conditions;
      extras.value = res.data.extras;
      has_emergency_evidence.value = res.data.has_emergency_evidence;
      should_stop.value = res.data.should_stop;
      interview_token.value = res.data.interview_token;

    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    question: question.value, 
    conditions: conditions.value,
    extras: extras.value,
    has_emergency_evidence: has_emergency_evidence.value,
    should_stop: should_stop.value,
    interview_token: interview_token.value,
    error: error.value,
  }
}
