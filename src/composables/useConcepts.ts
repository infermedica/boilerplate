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

export async function useConcepts ( params: ConceptsParamsType = {
  ids: undefined,
  types: undefined,
}) {
  const { 
    ids,
    types,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const concepts = ref<ConceptItemModelType[] | null>(null);

  await engineApi.get('/concepts', {
    params: {
      ids: ids?.join(','),
      types: types?.join(','),
    }
  })
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
