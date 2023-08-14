import {
  RecommendedChannelType,
} from '@/composables/types';

export type RecommendSpecialistType = {
  id?: string,
  name?: string,
}

export type RecommendSpecialistResponseType = {
  recommended_specialist?: RecommendSpecialistType,
  recommended_channel: RecommendedChannelType,
}
