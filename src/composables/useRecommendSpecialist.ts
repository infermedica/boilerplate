import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
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
    .then((res: AxiosResponse<RecommendSpecialistResponseType>) => {
      response = res;
      recommendedSpecialist = res.data.recommendedSpecialist;
      recommendedChannel = res.data.recommendedChannel;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    recommendedSpecialist,
    recommendedChannel,
    error,
  }
}
