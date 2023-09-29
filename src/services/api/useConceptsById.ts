import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
  type ConceptsByIdParamsType,
  type ConceptItemModelType, 
} from '@/services';

export async function useConceptsById (params: ConceptsByIdParamsType) {

  const { conceptsId } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  let response: AxiosResponse<ConceptItemModelType> | null = null;
  let error: AxiosError | null = null;
  let conceptItemModel: ConceptItemModelType | null = null;
  let id: ConceptItemModelType['id'] | undefined = undefined;
  let type: ConceptItemModelType['type'] | undefined = undefined;
  let name: ConceptItemModelType['name'] | undefined = undefined;
  let commonName: ConceptItemModelType['commonName'] | undefined = undefined;

  await engineApi.get(`/concepts/${conceptsId}`)
    .then((res: AxiosResponse<ConceptItemModelType>) => {
      response = res;
      id = res.data.id;
      type = res.data.type;
      name = res.data.name;
      commonName = res.data.commonName;
      conceptItemModel = res.data;
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    conceptItemModel,
    id,
    type,
    name,
    commonName,
    error,
  }
}
