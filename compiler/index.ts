export function detectType(input: string): 'string' | 'number' | 'boolean' {
    if (!isNaN(parseFloat(input))) {
        return 'number';
    } else if (input === 'yes' || input === 'no') {
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
            return input === 'yes';
        default:
        case 'string':
            return input;
    }
}

export function toJSOutput(input: any, context: SimonLangContext) {
    if (context.variables.indexOf(input) >= 0) { return input.split(' ').join('_'); }
    const parsed = parse(input);
    switch(typeof parsed) {
        default:
            return "" + parsed;
        case 'string':
            return `"${parsed}"`;
    }
}

export class SimonLangContext {
    constructor(public readonly variables: string[] = []) {

    }
}

export function compileLine(line: string, context: SimonLangContext): {
    declaration?: string,
    compiledLine: string
} {
    if (line.startsWith('simon says')) {
        return {
            compiledLine: `console.log(${toJSOutput(line.split('simon says ')[1], context)});`
        };
    }
    if (line.startsWith('simon declares')) {
        const declareIndicator = line.indexOf('is') >= 0 ? 'is' : 'are';
        const variableData = line.replace('simon declares ', '').split(` ${declareIndicator} `);
        return {
            declaration: variableData[0],
            compiledLine: `var ${variableData[0].split(' ').join('_')} = ${toJSOutput(variableData[1], context)};`
        };
    }
    return { compiledLine: `// SIMON COMPILER ERROR while compiling "${line}"` };
}

export function compile(input: string) {
    const context = new SimonLangContext();
    const lines: string[] = [];
    input.split('\n').forEach(line => {
        const comp = compileLine(line, context);
        if (comp.declaration) { context.variables.push(comp.declaration); }
        lines.push(comp.compiledLine);
    });

    return lines.join('\n');
}