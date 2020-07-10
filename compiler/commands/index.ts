import { SimonLangContext } from '../context';
import { toJSOutput } from '../variables';

export type LineMeta = {
  declaration?: string,
  compiledLine: string
};

const commands: { [command: string]: (line: string, context: SimonLangContext) => LineMeta } = {
  says: (line: string, context: SimonLangContext) => ({
    compiledLine: `console.log(${toJSOutput(
      line,
      context
    )});`,
  }),
  declares: (line: string, context: SimonLangContext) => {
    const declareIndicator = line.indexOf("is") >= 0 ? "is" : "are";
    const variableData = line
      .replace("simon declares ", "")
      .split(` ${declareIndicator} `);
    return {
      declaration: variableData[0],
      compiledLine: `var ${variableData[0].split(" ").join("_")} = ${toJSOutput(
        variableData[1],
        context
      )};`,
    };
  }
}

export type Command = keyof typeof commands;

export const CommanNames = Object.keys(commands);

export function parseCommand(command: Command, remainder: string, context: SimonLangContext): LineMeta {
  return commands[command] ? commands[command](remainder, context) : { compiledLine: `// SIMON COMPILER ERROR unknown command "${command}"` };
}
