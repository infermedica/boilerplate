import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { useSetAuthHeaders } from '@/composables';
import { engineApiConfig } from '@/services/engineApiConfig';
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

  let response: AxiosResponse | null = null;
  let error: AxiosError | null = null;
  let id: RiskFactorDetailsType['id'] | null = null;
  let name: RiskFactorDetailsType['name'] | null = null;
  let commonName: RiskFactorDetailsType['commonName'] | undefined = undefined;
  let question: RiskFactorDetailsType['question'] | null = null;
  let questionThirdPerson: RiskFactorDetailsType['questionThirdPerson'] | undefined = undefined;
  let sexFilter: RiskFactorDetailsType['sexFilter'] | null = null;
  let category: RiskFactorDetailsType['category'] | undefined = undefined;
  let extras: RiskFactorDetailsType['extras'] | undefined = undefined;
  let imageUrl: RiskFactorDetailsType['imageUrl'] | undefined = undefined;
  let imageSource: RiskFactorDetailsType['imageSource'] | undefined = undefined;
  let seriousness: RiskFactorDetailsType['seriousness'] | undefined = undefined;

  await engineApi.get(`/risk_factors/${riskFactorsId}`, {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      'enable_triage_3': enableTriage3,
    }
  })
    .then((res: AxiosResponse) => {
      response = res;
      id = res.data.id;
      name = res.data.name;
      commonName = res.data.common_name;
      question = res.data.question;
      questionThirdPerson = res.data.question_third_person;
      sexFilter = res.data.sex_filter;
      category = res.data.category;
      extras = res.data.extras;
      imageUrl = res.data.image_url;
      imageSource = res.data.image_source;
      seriousness = res.data.seriousness;
    })
    .catch((err: AxiosError) => error = err);
  
  return {
    response,
    id,
    name,
    commonName,
    question,
    questionThirdPerson,
    sexFilter,
    category,
    extras,
    imageUrl,
    imageSource,
    seriousness,
    error,
  }
}
