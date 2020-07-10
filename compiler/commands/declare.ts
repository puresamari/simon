import { detectType, extractVariableName, toJSOutput } from '../variables';
import { SimonLangContext } from './../context';
import { LineMeta } from './definition';

function extractData(line: string, context: SimonLangContext): {
  name: string,
  data: string,
  isNew: boolean
} {
  const declareIndicator = line.indexOf("is") >= 0 ? "is" : "are";
  const variableData = line.split(` ${declareIndicator} `);
  const name = variableData[0];
  return {
    name,
    data: variableData[1],
    isNew: !context.variables.has(name)
  }
}

export default (command: string, line: string, context: SimonLangContext): LineMeta => {
  const { name, data, isNew } = extractData(line, context);
  return {
    declaration: isNew ? { name, type: detectType(data) } : null,
    compiledLine: `${isNew ? 'var ' : ''}${extractVariableName(name)} = ${toJSOutput(
      data,
      context
    )};`,
  };
}