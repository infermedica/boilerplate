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
  ConditionsParamsType, 
  ConditionType,
 } from '@/composables/types';

export async function useConditionsById(
  conditionId: string, 
  params: ConditionsParamsType
) {
  const {
    age,
    ageUnit, 
    enableTriage3,
    includeInternal,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig);

  const URI = new URL(`${import.meta.env.VITE_API}/conditions/${conditionId}`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const condition = ref<ConditionType | null>(null);
  const id = ref<ConditionType['id'] | null>(null);
  const name = ref<ConditionType['name'] | null>(null);
  const common_name = ref<ConditionType['common_name'] | undefined>(undefined);
  const sex_filter = ref<ConditionType['sex_filter'] | null>(null);
  const categories = ref<ConditionType['categories'] | undefined>(undefined);
  const prevelance = ref<ConditionType['prevalence'] | undefined>(undefined);
  const acuteness = ref<ConditionType['acuteness'] | undefined>(undefined);
  const severity = ref<ConditionType['severity'] | undefined>(undefined);
  const extras = ref<ConditionType['extras'] | {}>({}); 
  const triage_level = ref<ConditionType['triage_level'] | undefined>(undefined); 
  const recommended_channel = ref<ConditionType['recommended_channel'] | undefined>(undefined);

  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  enableTriage3 !== undefined && URI.searchParams.append('enable_triage_3', `${enableTriage3}`);
  includeInternal !== undefined && URI.searchParams.append('include_internal', `${includeInternal}`);

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      condition.value = res.data;
      id.value = res.data.id;
      name.value = res.data.name;
      common_name.value = res.data.common_name;
      sex_filter.value = res.data.sex_filter;
      categories.value = res.data.categories;
      prevelance.value = res.data.prevelance;
      acuteness.value = res.data.acuteness;
      severity.value = res.data.severity;
      extras.value = res.data.extras;
      triage_level.value = res.data.triage_level;
      recommended_channel.value = res.data.recommended_channel;
    })
    .catch((err: AxiosError) => error.value = err);

  return {
    response: response.value,
    error: error.value,
    condition: condition.value, 
    id: id.value,
    name: name.value,
    common_name: common_name.value,
    sex_filter: sex_filter.value,
    categories: categories.value,
    prevelance: prevelance.value,
    acuteness: acuteness.value,
    severity: severity.value,
    extras: extras.value,
    triage_level: triage_level.value,
    recommended_channel: recommended_channel.value,
  }
}
