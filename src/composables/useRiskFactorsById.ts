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
  AgeUnitType,
  RiskFactorsResponseType,
} from '@/composables/types';

export async function useRiskFactorsById (params: {
  riskFactorsId: string,
  age: number,
  ageUnit?: AgeUnitType,
  enable_triage_3?: boolean,
}) {
  const {
    riskFactorsId,
    age,
    ageUnit,
    enable_triage_3,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/risk_factors/${riskFactorsId}`);
  const response = ref<AxiosResponse<RiskFactorsResponseType> | null>(null);
  const id = ref<RiskFactorsResponseType['id'] | null>(null);
  const name = ref<RiskFactorsResponseType['name'] | null>(null);
  const common_name = ref<RiskFactorsResponseType['common_name'] | undefined>(undefined);
  const question = ref<RiskFactorsResponseType['question'] | null>(null);
  const question_third_person = ref<RiskFactorsResponseType['question_third_person'] | undefined>(undefined);
  const sex_filter = ref<RiskFactorsResponseType['sex_filter'] | null>(null);
  const category = ref<RiskFactorsResponseType['category'] | undefined>(undefined);
  const extras = ref<RiskFactorsResponseType['extras'] | undefined>(undefined);
  const image_url = ref<RiskFactorsResponseType['image_url'] | undefined>(undefined);
  const image_source = ref<RiskFactorsResponseType['image_source'] | undefined>(undefined);
  const error = ref<AxiosError | null>(null);

  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  enable_triage_3 && URI.searchParams.append('enable_triage_3', enable_triage_3.toString());

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      id.value = res.data.id;
      name.value = res.data.name;
      common_name.value = res.data.common_name;
      question.value = res.data.question;
      question_third_person.value = res.data.question_third_person;
      sex_filter.value = res.data.sex_filter;
      category.value = res.data.category;
      extras.value = res.data.extras;
      image_url.value = res.data.image_url;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    id: id.value,
    name: name.value,
    common_name: common_name.value,
    question: question.value,
    question_third_person: question_third_person.value,
    sex_filter: sex_filter.value,
    category: category.value,
    extras: extras.value,
    image_url: image_url.value,
    image_source: image_source.value,
    error: error.value,
  }
}
