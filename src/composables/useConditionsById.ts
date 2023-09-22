import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
import type {   
  ConditionsByIdParamsType, 
  ConditionType,
 } from '@/composables/types';

export async function useConditionsById( params: ConditionsByIdParamsType ) {
  const {
    conditionId,
    conditionsParams: {
      age,
      enableTriage3,
      includeInternal,
    }
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let condition: ConditionType | null = null;
  let id: ConditionType['id'] | null = null;
  let name: ConditionType['name'] | null = null;
  let commonName: ConditionType['commonName'] | undefined = undefined;
  let sexFilter: ConditionType['sexFilter'] | null = null;
  let categories: ConditionType['categories'] | undefined = undefined;
  let prevelance: ConditionType['prevalence'] | undefined = undefined;
  let acuteness: ConditionType['acuteness'] | undefined = undefined;
  let severity: ConditionType['severity'] | undefined = undefined;
  let extras: ConditionType['extras'] | {} = {}; 
  let triageLevel: ConditionType['triageLevel'] | undefined = undefined; 
  let recommendedChannel: ConditionType['recommendedChannel'] | undefined = undefined;

  await engineApi.get(`/conditions/${conditionId}`, {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3,
      include_internal: includeInternal
    }
  })
    .then((res: AxiosResponse) => {
      response = res;
      condition = res.data;
      id = res.data.id;
      name = res.data.name;
      commonName = res.data.common_name;
      sexFilter = res.data.sex_filter;
      categories = res.data.categories;
      prevelance = res.data.prevelance;
      acuteness = res.data.acuteness;
      severity = res.data.severity;
      extras = res.data.extras;
      triageLevel = res.data.triage_level;
      recommendedChannel = res.data.recommended_channel;
    })
    .catch((err: AxiosError) => error = err);

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
  }
}
