import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import { type Ref } from 'vue';
import {
  engineApiConfig,
  useSetAuthHeaders,
  type SearchParamsType,
  type SearchResultType,
} from '@/services';

export async function useSearchReactive(params: Ref<SearchParamsType>) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<SearchResultType[]> | null = null;
  let error: Error | AxiosError | null = null;
  let observations: SearchResultType[] | null | [] = null;

  if (!params.value.phrase) observations = null;

  if (params.value.phrase) {
    await engineApi.get('/search', {
      params: {
        phrase: params.value.phrase,
        'age.value': params.value.age.value,
        'age.unit': params.value.age.unit,
        sex: params.value.sex,
        maxResults: params.value.maxResults,
        types: params.value.types?.join(','),
      },
    })
      .then((res: AxiosResponse<SearchResultType[]>) => {
        response = res;
        observations = res.data;
      })
      .catch((err: AxiosError) => {
        error = err;
      });
  }

  return {
    response,
    observations,
    error,
  };
}
