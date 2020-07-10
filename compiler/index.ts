import { LineMeta, parseCommand, CommanNames, Command } from './commands';
import { SimonLangContext } from './context';

export const VERSION = '0.0.1';

export function compileLine(line: string, context: SimonLangContext): LineMeta {
  line = line.replace('simon ', '');
  const command = CommanNames.find(v => line.indexOf(v) >= 0) as Command;
  return parseCommand(command, line.replace(command + ' ', ''), context);
}

export function compile(input: string) {
    const context = new SimonLangContext();
    const lines: string[] = [];
    input.split('\n').forEach(line => {
        const comp = compileLine(line, context);
        if (comp.declaration) { context.variables.set(comp.declaration.name, comp.declaration.type); }
        lines.push(comp.compiledLine);
    });

    return lines.join('\n');
}