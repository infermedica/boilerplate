import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
import type {
  RationaleResponseType,
  DiagnosisRequestType,
 } from '@/composables/types';

 export async function useRationale (requestBody: DiagnosisRequestType) {
  
  const { engineApi } = useSetAuthHeaders(engineApiConfig);
  
  let response: AxiosResponse<RationaleResponseType> | null = null;
  let error: AxiosError | null = null;
  let type: RationaleResponseType['type'] | null = null;
  let observationParams: RationaleResponseType['observationParams'] | undefined = undefined;
  let conditionParams: RationaleResponseType['conditionParams'] | undefined = undefined;

  await engineApi.post('/rationale', requestBody)
    .then((res: AxiosResponse) => {
      response = res;
      type = res.data.type;
      observationParams = res.data.observationParams;
      conditionParams = res.data.conditionParams;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    type,
    observationParams,
    conditionParams,
    error,
  }
}
