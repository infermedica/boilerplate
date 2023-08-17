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
  ConceptItemModelType, 
  ConceptsParamsType,
} from '@/composables/types';

export async function useConcepts ( params: ConceptsParamsType) {
  const { 
    ids,
    types,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const URI = new URL(`${import.meta.env.VITE_API}/concepts`);
  ids && URI.searchParams.append('ids', ids.join(','));
  types && URI.searchParams.append('types', types.join(','));

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const concepts = ref<ConceptItemModelType[] | null>(null);

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      concepts.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    concepts: concepts.value, 
    error: error.value,
  }
}
