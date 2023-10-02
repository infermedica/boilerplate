export type AgeUnitType = 'year' | 'month';

export type AgeRequestType = {
  value: number,
  unit?: AgeUnitType,
};
