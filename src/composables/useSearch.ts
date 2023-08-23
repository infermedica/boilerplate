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
  SearchParamsType, 
  SearchResultType,
} from '@/composables/types';

export async function useSearch ( params: SearchParamsType ) {
  const {
    phrase,
    age,
    sex,
    maxResults,
    types,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const response = ref<AxiosResponse | null>(null);
  const error = ref<Error | AxiosError | null>(null);
  const observations = ref<SearchResultType[] | null | []>(null);

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
    .then((res: AxiosResponse) => {
      response.value = res;
      observations.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    observations: observations.value, 
    error: error.value,
  }
}
