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
  ParseRequestType,
  ParseResponseType,
 } from '@/composables/types';

 export async function useParse ( requestBody: ParseRequestType ) {

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const mentions = ref<ParseResponseType['mentions'] | undefined>(undefined);
  const obvious = ref<ParseResponseType['obvious'] | undefined>(undefined);
  const tokens = ref<ParseResponseType['tokens'] | undefined>(undefined);

  await engineApi.post('/parse', requestBody)
    .then((res: AxiosResponse) => {
      response.value = res;
      mentions.value = res.data.mentions;
      obvious.value = res.data.obvious;
      tokens.value = res.data.tokens;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    mentions: mentions.value,
    obvious: obvious.value,
    tokens: tokens.value,
    error: error.value,
  }
 }
