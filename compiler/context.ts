import { SimonVariableType } from './variables';

export class SimonLangVariableType extends Map<string, SimonVariableType> {
  constructor() {
    super([]);
  }
}

export class SimonLangContext {
  constructor(
    public readonly variables = new SimonLangVariableType()
  ) {}
}