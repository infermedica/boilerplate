import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  engineApiConfig,
  useSetAuthHeaders,
  SuggestResult,
  SuggestParams,
} from '@/services';

export async function useSuggest(params: SuggestParams) {
  const {
    request,
    maxResults,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<SuggestResult[]> | null = null;
  let suggest: SuggestResult[] | null = null;
  let error: AxiosError | null = null;

  await engineApi.post('/suggest', request, {
    params: {
      max_results: maxResults,
    },

  })
    .then((res: AxiosResponse<SuggestResult[]>) => {
      response = res;
      suggest = res.data;
    })
    .catch((err: AxiosError) => {
      error = err;
    });

  return {
    response,
    suggest,
    error,
  };
}
