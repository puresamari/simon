import { SimonLangContext } from './../context';
import { LineMeta } from './definition';
import { toJSOutput, extractVariableName } from '../variables';

export type Operator = "add" | "subtract" | "divide" | "multiply";

export enum OperratorDirection {
  Left,
  Right,
}

export const OperatorConnectorSideMapping = {
  to: OperratorDirection.Left,
  from: OperratorDirection.Left,
  by: OperratorDirection.Right,
  with: OperratorDirection.Right,
};

export const OperatorConnectors = Object.keys(OperatorConnectorSideMapping);
export type OperatorConnector = keyof typeof OperatorConnectorSideMapping;

export const OperatorSymbolMapping: { [operator in Operator]: string } = {
  add: "+",
  subtract: "-",
  divide: "/",
  multiply: "*",
};

export const OperatorNameMapping: { [name: string]: Operator } = {
  adds: "add",
  subtracts: "subtract",
  divides: "divide",
  multiplies: "multiply",
};

export function getOperator(name: string): Operator | null { return OperatorNameMapping[name] || name }
export function getSeperator(line: string): OperatorConnector | null { return OperatorConnectors.find(v => line.indexOf(v) >= 0) as OperatorConnector || name }

function compileOperatorLine(operator: Operator, seperator: OperatorConnector, left: string, right: string, context: SimonLangContext): string {
  switch (operator) {
    default:
      let vals = [left, right];
      if (OperatorConnectorSideMapping[seperator] === OperratorDirection.Left) { vals = vals.reverse(); }
      return vals.map(v => toJSOutput(v, context)).join(` ${OperatorSymbolMapping[operator]} `) + ';';
  }
}

export default function opertate(command: string, line: string, context: SimonLangContext): LineMeta {
  const operator = getOperator(command);
  if (!operator) { return { compiledLine: `// Operator ${command} not valid or known!` }; }
  const seperator = getSeperator(line);
  if (!seperator) { return { compiledLine: `// Seperator ${seperator} not valid or known for operator ${operator}!` }; }
  const members = line.split(` ${seperator} `);
  return {
    compiledLine: compileOperatorLine(operator, seperator, members[0], members[1], context)
  }
}
