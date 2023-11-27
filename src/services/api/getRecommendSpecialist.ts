import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  engineApiConfig,
  useSetAuthHeaders,
  type DiagnosisRequestType,
  type RecommendSpecialistType,
  type RecommendedChannelType,
  type RecommendSpecialistResponseType,
} from '@/services';

export async function getRecommendSpecialist(requestBody: DiagnosisRequestType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<RecommendSpecialistResponseType> | null = null;
  let error: AxiosError | null = null;
  let recommendedSpecialist: RecommendSpecialistType | undefined;
  let recommendedChannel: RecommendedChannelType | undefined;

  await engineApi.post('/recommend_specialist', requestBody)
    .then((res: AxiosResponse<RecommendSpecialistResponseType>) => {
      response = res;
      recommendedSpecialist = res.data.recommendedSpecialist;
      recommendedChannel = res.data.recommendedChannel;
    })
    .catch((err: AxiosError) => {
      error = err;
    });

  return {
    response,
    recommendedSpecialist,
    recommendedChannel,
    error,
  };
}
