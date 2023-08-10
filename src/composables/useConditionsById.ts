import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useSetAuthHeaders } from '@/composables/useSetAuthHeaders';
import { engineApiConfig } from '@/composables/engineApiConfig';
import type { 
  ConditionsParamsType, 
  Condition,
 } from '@/composables/types';

export async function useConditionsById(
  id: string, 
  params: ConditionsParamsType
) {
  const {
    age,
    ageUnit, 
    enableTriage3,
    includeInternal,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const URI = new URL(`${import.meta.env.VITE_API}/conditions/${id}`);
  const data = ref<Condition[] | []>([]);
  const error = ref<Error | AxiosError | null>(null);

  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  enableTriage3 !== undefined && URI.searchParams.append('enable_triage_3', `${enableTriage3}`);
  includeInternal !== undefined && URI.searchParams.append('include_internal', `${includeInternal}`);

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
