export type RationaleParamType = {
  id: string,
  name: string,
  commonName?: string,
};

export type RationaleResponseType = {
  type: 'r0' | 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'r6',
  observationParams?: RationaleParamType[],
  conditionParams?: RationaleParamType[],
};
