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
  ConceptItemModel, 
  ConceptsParamType,
} from '@/composables/types';

export async function useConcepts ( params: ConceptsParamType) {
  const { 
    ids,
    types,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const URI = new URL(`${import.meta.env.VITE_API}/concepts`);
  ids && URI.searchParams.append('ids', ids.join(','));
  types && URI.searchParams.append('types', types.join(','));

  const response = ref<AxiosResponse | null>(null);
  const conceptsList = ref<ConceptItemModel[] | [] | null>([]);
  const error = ref<AxiosError | null>(null);

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      conceptsList.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    conceptsList: conceptsList.value, 
    error: error.value,
  }
}
