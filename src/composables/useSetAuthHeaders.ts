import axios from 'axios';
import type { EngineApiConfigType } from '@/composables/types';
import { convertResponse, convertRequest } from '@/composables/helpers';

export function useSetAuthHeaders( engineApiConfig: EngineApiConfigType) {

  const {
    baseURL,
    appId,
    appKey,
    // interviewToken,
  } = engineApiConfig;

  const engineApi = axios.create({
    baseURL: baseURL,
  });

  engineApi.defaults.headers.common['App-Id'] = appId;
  engineApi.defaults.headers.common['App-Key'] = appKey;
  engineApi.defaults.headers.common['Content-Type'] = 'application/json';
  // engineApi.defaults.headers.common['Interview-Token'] = interviewToken;
  // engineApi.defaults.headers.common['Access-Control-Allow-Headers'] = 'App-Id, App-Key, Content-Type, Interview-Token';

  engineApi.interceptors.response.use((response) => {
    if (
      response.data &&
      response.headers['content-type'] === 'application/json'
    ) {
      response.data = convertResponse(response.data);
    }
    return response;
  
  });

  engineApi.interceptors.request.use((config) => {
    const newConfig = { ...config };
  
    if (config.data) {
      newConfig.data = convertRequest(config.data);
    }

    return newConfig;
  });

  return { engineApi };
}
