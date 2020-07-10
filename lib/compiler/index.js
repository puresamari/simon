"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.compileLine = exports.SimonLangContext = exports.toJSOutput = exports.parse = exports.detectType = void 0;
function detectType(input) {
    if (!isNaN(parseFloat(input))) {
        return 'number';
    }
    else if (input === 'yes' || input === 'no') {
        return 'boolean';
    }
    else {
        return 'string';
    }
}
exports.detectType = detectType;
function parse(input) {
    switch (detectType(input)) {
        case 'number':
            return parseFloat(input);
        case 'boolean':
            return input === 'yes';
        default:
        case 'string':
            return input;
    }
}
exports.parse = parse;
function toJSOutput(input, context) {
    if (context.variables.indexOf(input) >= 0) {
        return input.split(' ').join('_');
    }
    var parsed = parse(input);
    switch (typeof parsed) {
        default:
            return "" + parsed;
        case 'string':
            return "\"" + parsed + "\"";
    }
}
exports.toJSOutput = toJSOutput;
var SimonLangContext = /** @class */ (function () {
    function SimonLangContext(variables) {
        if (variables === void 0) { variables = []; }
        this.variables = variables;
    }
    return SimonLangContext;
}());
exports.SimonLangContext = SimonLangContext;
function compileLine(line, context) {
    if (line.startsWith('simon says')) {
        return {
            compiledLine: "console.log(" + toJSOutput(line.split('simon says ')[1], context) + ");"
        };
    }
    if (line.startsWith('simon declares')) {
        var declareIndicator = line.indexOf('is') >= 0 ? 'is' : 'are';
        var variableData = line.replace('simon declares ', '').split(" " + declareIndicator + " ");
        return {
            declaration: variableData[0],
            compiledLine: "var " + variableData[0].split(' ').join('_') + " = " + toJSOutput(variableData[1], context) + ";"
        };
    }
    return { compiledLine: "// SIMON COMPILER ERROR while compiling \"" + line + "\"" };
}
exports.compileLine = compileLine;
function compile(input) {
    var context = new SimonLangContext();
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
