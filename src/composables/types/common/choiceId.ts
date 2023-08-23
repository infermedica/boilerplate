import type { ObjectValues } from '@/composables/types';

const CHOICE_ID = {
  ABSENT: 'absent',
  PRESENT: 'present',
  UNKNOWN: 'unknown',
} as const;

export type ChoiceIdType = ObjectValues<typeof CHOICE_ID>
