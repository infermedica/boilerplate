import { ref } from 'vue';
import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
} from '@/composables';
import type { ConceptItemModel } from '@/composables/types';

export async function useConceptsById ( id: string ) {

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/concepts/${id}`);
  const response = ref<AxiosResponse | null>(null);
  const conceptsItem = ref<ConceptItemModel | null>(null);
  const error = ref<AxiosError | null>(null);

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      conceptsItem.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    conceptsItem: conceptsItem.value, 
    error: error.value,
  }
}
