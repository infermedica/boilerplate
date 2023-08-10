import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useSetClientHeaders } from './useSetClientHeaders';
import type { 
  SearchParamsType, 
  SearchResult,
 } from '@/composables/types';

export async function useSearchSymptoms (
  params: SearchParamsType
) {

  const engineApiConfig = {
    baseURL: import.meta.env.VITE_API,
    appId: import.meta.env.VITE_APP_ID, 
    appKey: import.meta.env.VITE_APP_KEY,
  }

  const { engineApi } = useSetClientHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/search`);
    const {
      phrase,
      age,
      ageUnit,
      maxResults,
      types,
    } = params;

  const data = ref<SearchResult[] | []>([]);

  let error = ref<Error | AxiosError | null>(null);

  URI.searchParams.append('phrase', phrase);
  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  maxResults && URI.searchParams.append('max_results', maxResults.toString());
  types && URI.searchParams.append('types', types);

  await engineApi.get(URI.toString())
    .then((response) => {
      data.value = response.data;
    })
    .catch((error: Error | AxiosError) => error = error)

  return {
    data, 
    error,
  }
}
