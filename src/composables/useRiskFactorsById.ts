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

  const response = ref<AxiosResponse | null>(null);
  const error = ref<AxiosError | null>(null);
  const id = ref<RiskFactorDetailsType['id'] | null>(null);
  const name = ref<RiskFactorDetailsType['name'] | null>(null);
  const commonName = ref<RiskFactorDetailsType['commonName'] | undefined>(undefined);
  const question = ref<RiskFactorDetailsType['question'] | null>(null);
  const questionThirdPerson = ref<RiskFactorDetailsType['questionThirdPerson'] | undefined>(undefined);
  const sexFilter = ref<RiskFactorDetailsType['sexFilter'] | null>(null);
  const category = ref<RiskFactorDetailsType['category'] | undefined>(undefined);
  const extras = ref<RiskFactorDetailsType['extras'] | undefined>(undefined);
  const imageUrl = ref<RiskFactorDetailsType['imageUrl'] | undefined>(undefined);
  const imageSource = ref<RiskFactorDetailsType['imageSource'] | undefined>(undefined);
  const seriousness = ref<RiskFactorDetailsType['seriousness'] | undefined>(undefined);

  await engineApi.get(`/risk_factors/${riskFactorsId}`, {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      'enable_triage_3': enableTriage3,
    }
  })
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
