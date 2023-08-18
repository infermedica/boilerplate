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
  SuggestResult,
  SuggestParams
} from '@/composables/types';

 export async function useSuggest ( params: SuggestParams ) {
  
  const { 
    request,
    maxResults,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const URI = new URL(`${import.meta.env.VITE_API}/suggest`);
  const response = ref<AxiosResponse | null>(null);
  const suggest = ref<SuggestResult[] | null>(null);
  const error = ref<AxiosError | null>(null);

  maxResults && URI.searchParams.append('max_results', maxResults.toString());

  await engineApi.post(URI.toString(), request)
    .then((res: AxiosResponse) => {
      response.value = res;
      suggest.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    suggest: suggest.value,
    error: error.value,
  }
 }
