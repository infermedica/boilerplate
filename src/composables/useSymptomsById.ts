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
  SymptomsByIdParams, 
  SymptomDetailsType,
 } from './types';

export async function useSymptomsById ( params: SymptomsByIdParams ) {

  const {
    symptomId,
    age,
    enableTriage3
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/symptoms/${symptomId}`);
  const response = ref<AxiosResponse<SymptomDetailsType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const id= ref<SymptomDetailsType['id'] | null>(null);
  const name = ref<SymptomDetailsType['name'] | null>(null);
  const commonName = ref<SymptomDetailsType['common_name'] | undefined>(undefined);
  const question = ref<SymptomDetailsType['question'] | null>(null);
  const questionThirdPerson = ref<SymptomDetailsType['question_third_person'] | null>(null);
  const sexFilter = ref<SymptomDetailsType['sex_filter'] | null>(null);
  const category = ref<SymptomDetailsType['category'] | undefined>(undefined);
  const seriousness = ref<SymptomDetailsType['seriousness'] | undefined>(undefined);
  const extras = ref<SymptomDetailsType['extras'] | undefined>(undefined);
  const children = ref<SymptomDetailsType['children'] | undefined>(undefined);
  const imageUrl = ref<SymptomDetailsType['image_url'] | undefined>(undefined);
  const imageSource = ref<SymptomDetailsType['image_source'] | undefined>(undefined);
  const parentId = ref<SymptomDetailsType['parent_id'] | undefined>(undefined);
  const parentRelation = ref<SymptomDetailsType['parent_relation'] | undefined>(undefined);

  URI.searchParams.append('age.value', age.value.toString());
  age.unit && URI.searchParams.append('age.unit', age.unit);
  enableTriage3 && URI.searchParams.append('enable_triage_3', enableTriage3.toString());

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      id.value = res.data.id;
      name.value = res.data.name;
      commonName.value = res.data.common_name,
      question.value = res.data.question;
      questionThirdPerson.value = res.data.question_third_person;
      sexFilter.value = res.data.sex_filter;
      category.value = res.data.category;
      seriousness.value = res.data.seriousness;
      extras.value = res.data.extras;
      children.value = res.data.children;
      imageUrl.value = res.data.image_url;
      imageSource.value = res.data.image_source;
      parentId.value = res.data.parent_id;
      parentRelation.value = res.data.parent_relation;
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
    seriousness: seriousness.value,
    extras: extras.value,
    children: children.value,
    imageUrl: imageUrl.value,
    imageSource: imageSource.value,
    parentId: parentId.value,
    parentRelation: parentRelation.value,
    error: error.value,
  }
}
