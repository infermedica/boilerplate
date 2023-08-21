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
  RiskFactorDetailsType,
  RiskFactorsByIdParams,
} from '@/composables/types';

export async function useRiskFactorsById ( params: RiskFactorsByIdParams ) {
  const {
    riskFactorsId,
    age,
    enableTriage3,
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/risk_factors/${riskFactorsId}`);
  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const id = ref<RiskFactorDetailsType['id'] | null>(null);
  const name = ref<RiskFactorDetailsType['name'] | null>(null);
  const commonName = ref<RiskFactorDetailsType['common_name'] | undefined>(undefined);
  const question = ref<RiskFactorDetailsType['question'] | null>(null);
  const questionThirdPerson = ref<RiskFactorDetailsType['question_third_person'] | undefined>(undefined);
  const sexFilter = ref<RiskFactorDetailsType['sex_filter'] | null>(null);
  const category = ref<RiskFactorDetailsType['category'] | undefined>(undefined);
  const extras = ref<RiskFactorDetailsType['extras'] | undefined>(undefined);
  const imageUrl = ref<RiskFactorDetailsType['image_url'] | undefined>(undefined);
  const imageSource = ref<RiskFactorDetailsType['image_source'] | undefined>(undefined);
  const seriousness = ref<RiskFactorDetailsType['seriousness'] | undefined>(undefined);

  URI.searchParams.append('age.value', age.value.toString());
  age.unit && URI.searchParams.append('age.unit', age.unit);
  enableTriage3 && URI.searchParams.append('enable_triage_3', enableTriage3.toString());

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      id.value = res.data.id;
      name.value = res.data.name;
      commonName.value = res.data.common_name;
      question.value = res.data.question;
      questionThirdPerson.value = res.data.question_third_person;
      sexFilter.value = res.data.sex_filter;
      category.value = res.data.category;
      extras.value = res.data.extras;
      imageUrl.value = res.data.image_url;
      imageSource.value = res.data.image_source;
      seriousness.value = res.data.seriousness;
    })
    .catch((err: AxiosError) => error.value = err);
  
  return {
    response: response.value,
    id: id.value,
    name: name.value,
    commonName: commonName.value,
    question: question.value,
    questionThirdPerson: questionThirdPerson.value,
    sexFilter: sexFilter.value,
    category: category.value,
    extras: extras.value,
    imageUrl: imageUrl.value,
    imageSource: imageSource.value,
    seriousness: seriousness.value,
    error: error.value,
  }
}
