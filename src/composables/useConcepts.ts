import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useSetAuthHeaders } from '@/composables/useSetAuthHeaders';
import { engineApiConfig } from '@/composables/engineApiConfig';
import type { 
  ConceptItemModel, 
  ConceptsParamType,
} from '@/composables/types/index';

export async function useConcepts ( params: ConceptsParamType) {
  const { 
    ids,
    types,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const URI = new URL(`${import.meta.env.VITE_API}/concepts`);
  ids && URI.searchParams.append('ids', ids.join(','));
  types && URI.searchParams.append('types', types.join(','));

  const data = ref<ConceptItemModel[] | null>([]);
  const error = ref<Error | AxiosError | null>(null);

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
