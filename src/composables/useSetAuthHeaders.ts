import axios from 'axios';

export function useSetAuthHeaders( engineApiConfig: {
  baseURL: string,
  appId: string, 
  appKey: string,
  interviewToken?: string,
  }) {

  const {
    baseURL,
    appId,
    appKey,
    interviewToken,
  } = engineApiConfig;
  const engineApi = axios.create({
    baseURL: baseURL,
  });

  engineApi.defaults.headers.common['App-Id'] = appId;
  engineApi.defaults.headers.common['App-Key'] = appKey;
  engineApi.defaults.headers.common['Content-Type'] = 'application/json';
  // engineApi.defaults.headers.common['Interview-Token'] = interviewToken;
  // engineApi.defaults.headers.common['Access-Control-Allow-Headers'] = 'App-Id, App-Key, Content-Type, Interview-Token';

  return { engineApi };
}
