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
  ConceptsByIdParamsType,
  ConceptItemModelType,
 } from '@/composables/types';

export async function useConceptsById (params: ConceptsByIdParamsType) {

  const { id } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/concepts/${id}`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const conceptsItemModel = ref<ConceptItemModelType | null>(null);

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      conceptsItemModel.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    conceptsItemModel: conceptsItemModel.value, 
    error: error.value,
  }
}
