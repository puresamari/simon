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

export const OperatorSimpleNameMapping: { [name: string]: Operator } = {
  'divided by': "divide",
  plus: "add",
  minus: "subtract",
  'multiplied by': "multiply"
};

export function getOperator(name: string): Operator | null { return OperatorNameMapping[name] || name }
export function getSeperator(line: string): OperatorConnector | null { return OperatorConnectors.find(v => line.indexOf(v) >= 0) as OperatorConnector }

function compileOperatorLine(operator: Operator, direction: OperratorDirection, left: string, right: string, context: SimonLangContext, assignTo?: string): string {
  switch (operator) {
    default:
      let vals = [left, right];
      if (direction = OperratorDirection.Left) { vals = vals.reverse(); }
      if (!assignTo) { assignTo = vals[0]; }
      if (!context.variables.has(assignTo)) { return `// ${toJSOutput(assignTo, context)} is not a variable or wasnt declared yet. `; }
      return vals.map(v => toJSOutput(v, context)).join(` ${OperatorSymbolMapping[operator]}= `) + ';';
  }
}

function evalDeclarationGetFirstIndex(line: string) {
  const mappings = Object.keys(OperatorSimpleNameMapping);
  let first: { operator: Operator, start: number, end: number } | null = null;
  for (let i = 0; i < mappings.length; i++) {
    const start = line.indexOf(mappings[i]);
    const operator = OperatorSimpleNameMapping[mappings[i]];
    if (
      (start >= 0) &&
      (!first || first!.start > start)
    ) {
      first = {
        operator,
        start,
        end: start + mappings[i].length // !seperator ? start + operator.length : line.indexOf(seperator) + seperator.length// : start + mappings[i].length // start + mappings[i].length
      };
    }
  }
  return first;
}
export function evalDeclaration(line: string, context: SimonLangContext): string {
  const firstOperator = evalDeclarationGetFirstIndex(line);
  if (!firstOperator) { return toJSOutput(line, context); }
  return `${toJSOutput(line.slice(0, firstOperator.start - 1), context)} ${OperatorSymbolMapping[firstOperator.operator]} ${evalDeclaration(line.slice(firstOperator.end + 1, line.length), context)}`;
}

export default function opertate(command: string, line: string, context: SimonLangContext): LineMeta {
  const operator = getOperator(command);
  if (!operator) { return { compiledLine: `// Operator ${command} not valid or known!` }; }
  const seperator = getSeperator(line);
  if (!seperator) { return { compiledLine: `// Seperator ${seperator} not valid or known for operator ${operator}!` }; }
  const members = line.split(` ${seperator} `);
  return {
    compiledLine: compileOperatorLine(operator, OperatorConnectorSideMapping[seperator], members[0], members[1], context)
  }
}
