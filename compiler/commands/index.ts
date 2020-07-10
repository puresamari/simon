import { SimonVariableType } from './../variables';
import { SimonLangContext } from '../context';
import { toJSOutput } from '../variables';
import declares from './declare';

export type LineMeta = {
  declaration?: { name: string, type: SimonVariableType } | null,
  compiledLine: string
};

const commands: { [command: string]: (line: string, context: SimonLangContext) => LineMeta } = {
  says: (line: string, context: SimonLangContext) => ({
    compiledLine: `console.log(${toJSOutput(
      line,
      context
    )});`,
  }),
  declares
}

export type Command = keyof typeof commands;

export const CommanNames = Object.keys(commands);

export function parseCommand(command: Command, remainder: string, context: SimonLangContext): LineMeta {
  return commands[command] ? commands[command](remainder, context) : { compiledLine: `// SIMON COMPILER ERROR unknown command "${command}"` };
}
