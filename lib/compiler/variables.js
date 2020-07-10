"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSOutput = exports.extractVariableName = exports.parse = exports.detectType = void 0;
function detectType(input) {
    if (!isNaN(parseFloat(input))) {
        return 'number';
    }
    else if (input === 'yes' || input === 'no' || input === 'true' || input === 'false') {
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
            return (input === 'yes') || (input === 'true');
        default:
        case 'string':
            return input;
    }
}
exports.parse = parse;
function extractVariableName(input) {
    return 'simonvar_' + input.split(' ').join('_');
}
exports.extractVariableName = extractVariableName;
function toJSOutput(input, context) {
    if (context.variables.indexOf(input) >= 0) {
        return extractVariableName(input);
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
