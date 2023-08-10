export type ConditionsParamsType = {
  age: number,
  ageUnit?: 'year' | 'month', 
  enableTriage3?: boolean,
  includeInternal?: boolean,
}

export type Condition = {
  id: string,
  name: string,
  common_name?: string,
  sex_filter?: 'both' | 'male' | 'female',
  categories: string[],
  prevalence?: 'very_rare' | 'rare' | 'moderate' | 'common',
  acuteness?: 'chronic' | 'chronic_with_exacerbations' | 'acute_potentially_chronic' | 'acute',
  severity?: 'mild' | 'moderate' | 'severe',
  extras?: Record<string, unknown> ,
  triage_level?: 'emergency_ambulance' | 'emergency' | 'consultation_24' | 'consultation' | 'self_care',
  recommended_channel?: 'personal_visit' | 'video_teleconsultation' | 'audio_teleconsultation' | 'text_teleconsultation',
}
