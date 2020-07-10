import { SimonLangContext } from './context';

export type SimonVariableType = 'string' | 'number' | 'boolean';

export function detectType(input: string): SimonVariableType {
  if (!isNaN(parseFloat(input))) {
      return 'number';
  } else if (input === 'yes' || input === 'no' || input === 'true' || input === 'false') {
      return 'boolean';
  } else {
      return 'string';
  }
}

export function parse(input: string) {
  switch(detectType(input)) {
      case 'number':
          return parseFloat(input);
      case 'boolean':
          return (input === 'yes') || (input === 'true');
      default:
      case 'string':
          return input;
  }
}

export function extractVariableName(input: string) {
  return 'simonvar_' + input.split(' ').join('_');
}

export function toJSOutput(input: any, context: SimonLangContext) {
  if (typeof input === 'string' && context.variables.has(input)) { return extractVariableName(input); }
  const parsed = parse(input);
  switch(typeof parsed) {
      default:
          return "" + parsed;
      case 'string':
          return `"${parsed}"`;
  }
}