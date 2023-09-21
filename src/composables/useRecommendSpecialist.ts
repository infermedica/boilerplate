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
  
  let response: AxiosResponse<RecommendSpecialistResponseType> | null = null;
  let error: AxiosError | null = null;
  let recommendedSpecialist: RecommendSpecialistType | undefined = undefined;
  let recommendedChannel: RecommendedChannelType | undefined = undefined;

  await engineApi.post('/recommend_specialist', requestBody)
    .then((res: AxiosResponse) => {
      response = res;
      recommendedSpecialist = res.data.recommended_specialist;
      recommendedChannel = res.data.recommended_channel;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    recommendedSpecialist,
    recommendedChannel,
    error,
  }
}
