import { SimonVariableType } from './../variables';

export type LineMeta = {
  declaration?: { name: string, type: SimonVariableType } | null,
  compiledLine: string
};
