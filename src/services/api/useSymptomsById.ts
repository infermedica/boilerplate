import type { 
  AxiosResponse,
  AxiosError,
} from 'axios';
import { 
  engineApiConfig,
  useSetAuthHeaders,
  type SymptomsByIdParams, 
  type SymptomDetailsType,
} from '@/services';

export async function useSymptomsById ( params: SymptomsByIdParams ) {

  const {
    symptomId,
    age,
    enableTriage3
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  let response: AxiosResponse<SymptomDetailsType> | null = null;
  let error: AxiosError | null = null;
  let id: SymptomDetailsType['id'] | null = null;
  let name: SymptomDetailsType['name'] | null = null;
  let commonName: SymptomDetailsType['commonName'] | undefined = undefined;
  let question: SymptomDetailsType['question'] | null = null;
  let questionThirdPerson: SymptomDetailsType['questionThirdPerson'] | null = null;
  let sexFilter: SymptomDetailsType['sexFilter'] | null = null;
  let category: SymptomDetailsType['category'] | undefined = undefined;
  let seriousness: SymptomDetailsType['seriousness'] | undefined = undefined;
  let extras: SymptomDetailsType['extras'] | undefined = undefined;
  let children: SymptomDetailsType['children'] | undefined = undefined;
  let imageUrl: SymptomDetailsType['imageUrl'] | undefined = undefined;
  let imageSource: SymptomDetailsType['imageSource'] | undefined = undefined;
  let parentId: SymptomDetailsType['parentId'] | undefined = undefined;
  let parentRelation: SymptomDetailsType['parentRelation'] | undefined = undefined;

  await engineApi.get(`/symptoms/${symptomId}`, {
    params: {
      'age.value': age.value,
      'age.unit': age.unit,
      enable_triage_3: enableTriage3
    }
  })
    .then((res: AxiosResponse<SymptomDetailsType>) => {
      response = res;
      id = res.data.id;
      name = res.data.name;
      commonName = res.data.commonName,
      question = res.data.question;
      questionThirdPerson = res.data.questionThirdPerson;
      sexFilter = res.data.sexFilter;
      category = res.data.category;
      seriousness = res.data.seriousness;
      extras = res.data.extras;
      children = res.data.children;
      imageUrl = res.data.imageUrl;
      imageSource = res.data.imageSource;
      parentId = res.data.parentId;
      parentRelation = res.data.parentRelation;
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
    seriousness,
    extras,
    children,
    imageUrl,
    imageSource,
    parentId,
    parentRelation,
    error,
  }
}
