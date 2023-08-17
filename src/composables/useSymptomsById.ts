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
    ageUnit,
    enableTriage3
  } = params;

  const { engineApi } = useSetAuthHeaders(engineApiConfig)

  const URI = new URL(`${import.meta.env.VITE_API}/symptoms/${symptomId}`);
  const response = ref<AxiosResponse<SymptomDetailsType> | null>(null);
  const error = ref<AxiosError | null>(null);
  const id= ref<SymptomDetailsType['id'] | null>(null);
  const name = ref<SymptomDetailsType['name'] | null>(null);
  const common_name = ref<SymptomDetailsType['common_name'] | undefined>(undefined);
  const question = ref<SymptomDetailsType['question'] | null>(null);
  const question_third_person = ref<SymptomDetailsType['question_third_person'] | null>(null);
  const sex_filter = ref<SymptomDetailsType['sex_filter'] | null>(null);
  const category = ref<SymptomDetailsType['category'] | undefined>(undefined);
  const seriousness = ref<SymptomDetailsType['seriousness'] | undefined>(undefined);
  const extras = ref<SymptomDetailsType['extras'] | undefined>(undefined);
  const children = ref<SymptomDetailsType['children'] | undefined>(undefined);
  const image_url = ref<SymptomDetailsType['image_url'] | undefined>(undefined);
  const image_source = ref<SymptomDetailsType['image_source'] | undefined>(undefined);
  const parent_id = ref<SymptomDetailsType['parent_id'] | undefined>(undefined);
  const parent_relation = ref<SymptomDetailsType['parent_relation'] | undefined>(undefined);

  URI.searchParams.append('age.value', age.toString());
  ageUnit && URI.searchParams.append('age.unit', ageUnit);
  enableTriage3 && URI.searchParams.append('enable_triage_3', enableTriage3.toString());

  await engineApi.get(URI.toString())
    .then((res: AxiosResponse) => {
      response.value = res;
      id.value = res.data.id;
      name.value = res.data.name;
      common_name.value = res.data.common_name,
      question.value = res.data.question;
      question_third_person.value = res.data.question_third_person;
      sex_filter.value = res.data.sex_filter;
      category.value = res.data.category;
      seriousness.value = res.data.seriousness;
      extras.value = res.data.extras;
      children.value = res.data.children;
      image_url.value = res.data.image_url;
      image_source.value = res.data.image_source;
      parent_id.value = res.data.parent_id;
      parent_relation.value = res.data.parent_relation;
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
    seriousness: seriousness.value,
    extras: extras.value,
    children: children.value,
    image_url: image_url.value,
    image_source: image_source.value,
    parent_id: parent_id.value,
    parent_relation: parent_relation.value,
    error: error.value,
  }
}
