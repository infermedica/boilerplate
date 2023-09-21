import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
 } from '@/composables';
 import type {
  ParseRequestType,
  ParseResponseType,
 } from '@/composables/types';

 export async function useParse ( requestBody: ParseRequestType ) {

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let mentions: ParseResponseType['mentions'] | undefined = undefined;
  let obvious: ParseResponseType['obvious'] | undefined = undefined;
  let tokens: ParseResponseType['tokens'] | undefined = undefined;

  await engineApi.post('/parse', requestBody)
    .then((res: AxiosResponse) => {
      response = res;
      mentions = res.data.mentions;
      obvious = res.data.obvious;
      tokens = res.data.tokens;
    })
    .catch((err: AxiosError) => error = err);

  return {
    response,
    mentions,
    obvious,
    tokens,
    error,
  }
 }
