import type { EngineApiConfigType } from '@/services';

export const engineApiConfig: EngineApiConfigType = {
  baseURL: import.meta.env.VITE_API,
  appId: import.meta.env.VITE_APP_ID,
  appKey: import.meta.env.VITE_APP_KEY,
  model: import.meta.env.VITE_MODEL,
  devMode: import.meta.env.VITE_DEV_MODE,
};
