import {
  AgeRequestType,
  EvidenceType,
  ExtrasType,
  SexType,
} from '@/composables/types';

export type RationaleParam = {
  id: string,
  name: string,
  common_name?: string,
}

export type RationaleResponse = {
  type: 'r0' | 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'r6',
  observation_params?: RationaleParam[],
  condition_params?: RationaleParam[],
}

export type RationaleRequest = {
  sex: SexType,
  age: AgeRequestType,
  evidence?: EvidenceType[],
  evaluated_at?: string,
  extras?: ExtrasType,
}
