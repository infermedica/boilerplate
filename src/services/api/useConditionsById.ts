import type {
  AxiosResponse,
  AxiosError,
} from 'axios';
import {
  engineApiConfig,
  useSetAuthHeaders,
  type ConditionsByIdParamsType,
  type ConditionType,
} from '@/services';

export async function useConditionsById(params: ConditionsByIdParamsType) {
  const {
    conditionId,
    conditionsParams: {
      age,
      enableTriage3,
      includeInternal,
    },
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse<ConditionType> | null = null;
  let error: AxiosError | null = null;
  let condition: ConditionType | null = null;
  let id: ConditionType['id'] | null = null;
  let name: ConditionType['name'] | null = null;
  let commonName: ConditionType['commonName'] | undefined;
  let sexFilter: ConditionType['sexFilter'] | null = null;
  let categories: ConditionType['categories'] | undefined;
  let prevelance: ConditionType['prevalence'] | undefined;
  let acuteness: ConditionType['acuteness'] | undefined;
  let severity: ConditionType['severity'] | undefined;
  let extras: ConditionType['extras'] | Record<string, unknown> = {};
  let triageLevel: ConditionType['triageLevel'] | undefined;
  let recommendedChannel: ConditionType['recommendedChannel'] | undefined;

  await engineApi.get(`/conditions/${conditionId}`, {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
      include_internal: includeInternal,
    },
  })
    .then((res: AxiosResponse<ConditionType>) => {
      response = res;
      condition = res.data;
      id = res.data.id;
      name = res.data.name;
      commonName = res.data.commonName;
      sexFilter = res.data.sexFilter;
      categories = res.data.categories;
      prevelance = res.data.prevalence;
      acuteness = res.data.acuteness;
      severity = res.data.severity;
      extras = res.data.extras;
      triageLevel = res.data.triageLevel;
      recommendedChannel = res.data.recommendedChannel;
    })
    .catch((err: AxiosError) => {
      error = err;
    });

  return {
    response,
    error,
    condition,
    id,
    name,
    commonName,
    sexFilter,
    categories,
    prevelance,
    acuteness,
    severity,
    extras,
    triageLevel,
    recommendedChannel,
  };
}
