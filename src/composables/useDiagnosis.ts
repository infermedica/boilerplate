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
  DiagnosisRequestType,
  DiagnosisResponseType,
} from '@/composables/types';

export async function useDiagnosis (requestBody: DiagnosisRequestType) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const question = ref<DiagnosisResponseType['question'] | undefined>(undefined);
  const conditions = ref<DiagnosisResponseType['conditions'] | undefined>(undefined);
  const extras = ref<DiagnosisResponseType['extras'] | undefined>(undefined);
  const hasEmergencyEvidence = ref<DiagnosisResponseType['hasEmergencyEvidence'] | undefined>(undefined);
  const shouldStop = ref<DiagnosisResponseType['shouldStop'] | undefined>(undefined);
  const interviewToken = ref<DiagnosisResponseType['interviewToken'] | undefined>(undefined);

  await engineApi.post('/diagnosis', requestBody)
    .then((res: AxiosResponse) => {
      response.value = res;
      question.value = res.data.question;
      conditions.value = res.data.conditions;
      extras.value = res.data.extras;
      hasEmergencyEvidence.value = res.data.has_emergency_evidence;
      shouldStop.value = res.data.should_stop;
      interviewToken.value = res.data.interview_token;

    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    question: question.value, 
    conditions: conditions.value,
    extras: extras.value,
    hasEmergencyEvidence: hasEmergencyEvidence.value,
    shouldStop: shouldStop.value,
    interviewToken: interviewToken.value,
    error: error.value,
  }
}
