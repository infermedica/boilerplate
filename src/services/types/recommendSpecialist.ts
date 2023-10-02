import {
  RecommendedChannelType,
} from '@/services';

export type RecommendSpecialistType = {
  id?: string,
  name?: string,
};

export type RecommendSpecialistResponseType = {
  recommendedSpecialist?: RecommendSpecialistType,
  recommendedChannel?: RecommendedChannelType,
};
