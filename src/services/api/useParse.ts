import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  engineApiConfig,
  useSetAuthHeaders,
  type ParseRequestType,
  type ParseResponseType,
} from '@/services';

export async function useParse(requestBody: ParseRequestType) {
  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<ParseResponseType> | null = null;
  let error: AxiosError | null = null;
  let mentions: ParseResponseType['mentions'] | undefined;
  let obvious: ParseResponseType['obvious'] | undefined;
  let tokens: ParseResponseType['tokens'] | undefined;

  await engineApi.post('/parse', requestBody)
    .then((res: AxiosResponse<ParseResponseType>) => {
      response = res;
      mentions = res.data.mentions;
      obvious = res.data.obvious;
      tokens = res.data.tokens;
    })
    .catch((err: AxiosError) => {
      error = err;
    });

  return {
    response,
    mentions,
    obvious,
    tokens,
    error,
  };
}
