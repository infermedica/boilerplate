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
  
  const response = ref<AxiosResponse<RecommendSpecialistResponseType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const recommendedSpecialist = ref<RecommendSpecialistType | undefined>(undefined);
  const recommendedChannel = ref<RecommendedChannelType | undefined>(undefined);

  await engineApi.post('/recommend_specialist', requestBody)
    .then((res: AxiosResponse) => {
      response.value = res;
      recommendedSpecialist.value = res.data.recommended_specialist;
      recommendedChannel.value = res.data.recommended_channel;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    recommendedSpecialist: recommendedSpecialist.value,
    recommendedChannel: recommendedChannel.value,
    error: error.value,
  }
}
