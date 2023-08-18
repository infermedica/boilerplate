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

  const URI = new URL(`${import.meta.env.VITE_API}/search`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<Error | AxiosError | null>(null);
  const observations = ref<SearchResultType[] | null | []>(null);

  URI.searchParams.append('phrase', phrase);
  URI.searchParams.append('age.value', age.value.toString());
  age.unit && URI.searchParams.append('age.unit', age.unit);
  sex && URI.searchParams.append('sex', sex.toString());
  maxResults && URI.searchParams.append('max_results', maxResults.toString());
  types && URI.searchParams.append('types', types);

  await engineApi.get(URI.toString())
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
