import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useSetAuthHeaders } from '@/composables/useSetAuthHeaders';
import { engineApiConfig } from '@/composables/engineApiConfig';
import type { 
  SearchParamsType, 
  SearchResult,
 } from '@/composables/types';

export async function useSearch (
  params: SearchParamsType
) {

  const {
    phrase,
    age,
    ageUnit,
    maxResults,
    types,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const URI = new URL(`${import.meta.env.VITE_API}/search`);
  const data = ref<SearchResult[] | []>([]);
  const error = ref<Error | AxiosError | null>(null);

  URI.searchParams.append('phrase', phrase);
  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  maxResults && URI.searchParams.append('max_results', maxResults.toString());
  types && URI.searchParams.append('types', types);

  await engineApi.get(URI.toString())
    .then((response) => {
      data.value = response.data;
    })
    .catch((error: Error | AxiosError) => error = error);

  return {
    data: data.value, 
    error: error.value,
  }
}
