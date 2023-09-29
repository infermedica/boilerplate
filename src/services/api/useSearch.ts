import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
  type SearchParamsType, 
  type SearchResultType,
} from '@/services';

export async function useSearch ( params: SearchParamsType ) {
  const {
    phrase,
    age,
    sex,
    maxResults,
    types,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response:AxiosResponse<SearchResultType[]> | null = null;
  let error:Error | AxiosError | null = null;
  let observations:SearchResultType[] | null | [] = null;

  await engineApi.get('/search', {
    params: {
      phrase,
      'age.value': age.value,
      'age.unit': age.unit,
      sex,
      maxResults,
      types: types?.join(','),
    }
  })
    .then((res: AxiosResponse<SearchResultType[]>) => {
      response = res;
      observations = res.data;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    observations,
    error,
  }
}
