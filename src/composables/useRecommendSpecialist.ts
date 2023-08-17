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
  RecommendSpecialistType,
  RecommendedChannelType,
  RecommendSpecialistResponseType,
 } from '@/composables/types';

 export async function useRecommendSpecialist (requestBody: DiagnosisRequestType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  const URI = new URL(`${import.meta.env.VITE_API}/recommend_specialist`);
  const response = ref<AxiosResponse<RecommendSpecialistResponseType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const recommended_specialist = ref<RecommendSpecialistType | undefined>(undefined);
  const recommended_channel = ref<RecommendedChannelType | undefined>(undefined);

  await engineApi.post(URI.toString(), requestBody)
  .then((res: AxiosResponse) => {
    response.value = res;
    recommended_specialist.value = res.data.recommended_specialist;
    recommended_channel.value = res.data.recommended_channel;
  })
  .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    recommended_specialist: recommended_specialist.value,
    recommended_channel: recommended_channel.value,
    error: error.value,
  }
}
