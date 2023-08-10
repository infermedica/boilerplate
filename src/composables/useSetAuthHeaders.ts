import axios from 'axios';

export function useSetAuthHeaders( engineApiConfig: {
  baseURL: string,
  appId: string, 
  appKey: string,
  }) {

  const {
    baseURL,
    appId,
    appKey
  } = engineApiConfig;
  const engineApi = axios.create({
    baseURL: baseURL,
  });

  engineApi.defaults.headers.common['App-Id'] = appId;
  engineApi.defaults.headers.common['App-Key'] = appKey;
  engineApi.defaults.headers.common['Content-Type'] = 'application/json';

  return { engineApi };
}
