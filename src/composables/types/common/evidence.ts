import type { ChoiceIdType } from '@/composables/types';

export type EvidenceType = {
  id: string,
  choice_id: ChoiceIdType,
  observed_at?: string,
  source?: 'initial' | 'suggest' | 'predefined' | 'red_flags',
  duration?: {
    value: number,
    unit: 'week' | 'day' | 'hour' | 'minute',
  }
}
