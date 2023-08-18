export type RationaleParamType = {
  id: string,
  name: string,
  common_name?: string,
}

export type RationaleResponseType = {
  type: 'r0' | 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'r6',
  observation_params?: RationaleParamType[],
  condition_params?: RationaleParamType[],
}

