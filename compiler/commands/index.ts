import { SimonLangContext } from '../context';
import { toJSOutput } from '../variables';
import declares from './declare';
import operates from './operators';
import { LineMeta } from './definition';

const commands: { [command: string]: (command: string, line: string, context: SimonLangContext) => LineMeta } = {
  says: (command: string, line: string, context: SimonLangContext) => ({
    compiledLine: `console.log(${toJSOutput(
      line,
      context
    )});`,
  }),
  declares,
  adds: operates,
  multiplies: operates,
  divides: operates,
  subtracts: operates,
}

export type Command = keyof typeof commands;

export const CommanNames = Object.keys(commands);

export function parseCommand(command: Command, remainder: string, context: SimonLangContext): LineMeta {
  return commands[command] ? commands[command](command as string, remainder, context) : { compiledLine: `// SIMON COMPILER ERROR unknown command "${command}"` };
}
