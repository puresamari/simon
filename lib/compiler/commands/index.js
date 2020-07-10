"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = exports.CommanNames = void 0;
const tslib_1 = require("tslib");
const variables_1 = require("../variables");
const declare_1 = tslib_1.__importDefault(require("./declare"));
const operators_1 = tslib_1.__importDefault(require("./operators"));
const commands = {
    says: (command, line, context) => ({
        compiledLine: `console.log(${variables_1.toJSOutput(line, context)});`,
    }),
    declares: declare_1.default,
    adds: operators_1.default,
    multiplies: operators_1.default,
    divides: operators_1.default,
    subtracts: operators_1.default,
};
exports.CommanNames = Object.keys(commands);
function parseCommand(command, remainder, context) {
    return commands[command] ? commands[command](command, remainder, context) : { compiledLine: `// SIMON COMPILER ERROR unknown command "${command}"` };
}
exports.parseCommand = parseCommand;
