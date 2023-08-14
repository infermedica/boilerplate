export type AgeUnitType = 'year' | 'month';

export type AgeRequestType = {
  value: number,
  unit?: AgeUnitType,
}

export type SexType = 'both' | 'male' | 'female';

export type PrevalenceType = 'very_rare' | 'rare' | 'moderate' | 'common';

export type AcutenessType = 'chronic' | 'chronic_with_exacerbations' | 'acute_potentially_chronic' | 'acute';

export type SeverityType = 'mild' | 'moderate' | 'severe';

export type TriageLevelType = 'emergency_ambulance' | 'emergency' | 'consultation_24' | 'consultation' | 'self_care';

export type RecommendedChannelType = 'personal_visit' | 'video_teleconsultation' | 'audio_teleconsultation' | 'text_teleconsultation';

export type ExtrasType = Record<string, unknown> | {};

export type EvidenceType = {
  id: string,
  choice_id: 'present' | 'absent' | 'unknown',
  observed_at?: string,
  source?: 'initial' | 'suggest' | 'predefined' | 'red_flags',
  duration?: {
    value: number,
    unit: 'week' | 'day' | 'hour' | 'minute',
  }
}
