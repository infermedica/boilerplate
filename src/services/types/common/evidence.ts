import type { ChoiceIdType } from '@/services';

export type EvidenceType = {
  id: string;
  choiceId: ChoiceIdType;
  observedAt?: string;
  source?: 'initial' | 'suggest' | 'predefined' | 'red_flags';
  duration?: {
    value: number;
    unit: 'week' | 'day' | 'hour' | 'minute';
  };
};
