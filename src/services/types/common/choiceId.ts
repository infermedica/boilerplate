import type { ObjectValues } from '@/services';

const CHOICE_ID = {
  ABSENT: 'absent',
  PRESENT: 'present',
  UNKNOWN: 'unknown',
} as const;

export type ChoiceIdType = ObjectValues<typeof CHOICE_ID>
