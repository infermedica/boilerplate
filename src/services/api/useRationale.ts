import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  engineApiConfig,
  useSetAuthHeaders,
  type RationaleResponseType,
  type DiagnosisRequestType,
} from '@/services';

export async function useRationale(requestBody: DiagnosisRequestType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<RationaleResponseType> | null = null;
  let error: AxiosError | null = null;
  let type: RationaleResponseType['type'] | null = null;
  let observationParams: RationaleResponseType['observationParams'] | undefined;
  let conditionParams: RationaleResponseType['conditionParams'] | undefined;

  await engineApi.post('/rationale', requestBody)
    .then((res: AxiosResponse<RationaleResponseType>) => {
      response = res;
      type = res.data.type;
      observationParams = res.data.observationParams;
      conditionParams = res.data.conditionParams;
    })
    .catch((err: AxiosError) => {
      error = err;
    });

  return {
    response,
    type,
    observationParams,
    conditionParams,
    error,
  };
}
