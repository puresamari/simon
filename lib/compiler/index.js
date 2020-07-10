"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.compileLine = exports.VERSION = void 0;
var commands_1 = require("./commands");
var context_1 = require("./context");
exports.VERSION = '0.0.1';
function compileLine(line, context) {
    line = line.replace('simon ', '');
    var command = commands_1.CommanNames.find(function (v) { return line.indexOf(v) >= 0; });
    return commands_1.parseCommand(command, line.replace(command + ' ', ''), context);
}
exports.compileLine = compileLine;
function compile(input) {
    var context = new context_1.SimonLangContext();
    var lines = [];
    input.split('\n').forEach(function (line) {
        var comp = compileLine(line, context);
        if (comp.declaration) {
            context.variables.push(comp.declaration);
        }
        lines.push(comp.compiledLine);
    });
    return lines.join('\n');
}
exports.compile = compile;
