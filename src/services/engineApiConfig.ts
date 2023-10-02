import type { EngineApiConfigType } from '@/services';

export const engineApiConfig: EngineApiConfigType = {
  baseURL: import.meta.env.VITE_API,
  appId: import.meta.env.VITE_APP_ID,
  appKey: import.meta.env.VITE_APP_KEY,
};
