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
  
  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let concepts: ConceptItemModelType[] | null = null;

  await engineApi.get('/concepts', {
    params: {
      ids: ids?.join(','),
      types: types?.join(','),
    }
  })
    .then((res: AxiosResponse) => {
      response = res;
      concepts = res.data;
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    concepts, 
    error,
  }
}
