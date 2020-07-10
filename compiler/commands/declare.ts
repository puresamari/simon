import { extractVariableName, toJSOutput } from '../variables';
import { SimonLangContext } from './../context';

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
    isNew: !context.variables.includes(name)
  }
}

export default (line: string, context: SimonLangContext) => {
  const { name, data, isNew } = extractData(line, context);
  return {
    declaration: isNew ? name : null,
    compiledLine: `${isNew ? 'var ' : ''}${extractVariableName(name)} = ${toJSOutput(
      data,
      context
    )};`,
  };
}