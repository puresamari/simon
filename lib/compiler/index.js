"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.compileLine = exports.VERSION = void 0;
const commands_1 = require("./commands");
const context_1 = require("./context");
exports.VERSION = '0.0.1';
function compileLine(line, context) {
    if (!line.startsWith('simon')) {
        return { compiledLine: '' };
    }
    line = line.replace('simon ', '');
    const command = commands_1.CommanNames.find(v => line.indexOf(v) >= 0);
    return commands_1.parseCommand(command, line.replace(command + ' ', ''), context);
}
exports.compileLine = compileLine;
function compile(input) {
    const context = new context_1.SimonLangContext();
    const lines = [];
    input.split('\n').forEach(line => {
        const comp = compileLine(line, context);
        if (comp.declaration) {
            context.variables.set(comp.declaration.name, comp.declaration.type);
        }
        lines.push(comp.compiledLine);
    });
    return lines.join('\n');
}
exports.compile = compile;
