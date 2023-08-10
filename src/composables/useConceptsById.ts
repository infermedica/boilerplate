import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useSetAuthHeaders } from '@/composables/useSetAuthHeaders';
import { engineApiConfig } from '@/composables/engineApiConfig';
import type { ConceptItemModel } from '@/composables/types/index';

export async function useConceptsById ( id: string ) {

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/concepts/${id}`);
  const data = ref<ConceptItemModel | null>(null);
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
