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

  const { conceptsId } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const conceptItemModel = ref<ConceptItemModelType | null>(null);
  const id = ref<ConceptItemModelType['id'] | undefined>(undefined);
  const type = ref<ConceptItemModelType['type'] | undefined>(undefined);
  const name = ref<ConceptItemModelType['name'] | undefined>(undefined);
  const commonName = ref<ConceptItemModelType['common_name'] | undefined>(undefined);

  await engineApi.get(`/concepts/${conceptsId}`)
    .then((res: AxiosResponse) => {
      response.value = res;
      id.value = res.data.id;
      type.value = res.data.type;
      name.value = res.data.name;
      commonName.value = res.data.common_name;
      conceptItemModel.value = res.data;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    conceptItemModel: conceptItemModel.value,
    id: id.value,
    type: type.value,
    name: name.value,
    commonName: commonName.value,
    error: error.value,
  }
}
