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
  SuggestRequest,
  SuggestResult,
} from '@/composables/types';

 export async function useSuggest ( 
  params: {
    request: SuggestRequest, 
    maxResults?: number
  } ) {
  
  const { 
    request,
    maxResults,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const URI = new URL(`${import.meta.env.VITE_API}/suggest`);
  const response = ref<AxiosResponse<SuggestResult[]> | null>(null);
  const suggestList = ref<SuggestResult[]>([]);
  const error = ref<AxiosError | null>(null);

  maxResults && URI.searchParams.append('max_results', maxResults.toString());

  await engineApi.post(URI.toString(), request)
    .then((res: AxiosResponse) => {
      response.value = res;
      suggestList.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    suggestList: suggestList.value,
    error: error.value,
  }
 }
