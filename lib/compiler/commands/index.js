"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = exports.CommanNames = void 0;
var variables_1 = require("../variables");
var declare_1 = __importDefault(require("./declare"));
var commands = {
    says: function (line, context) { return ({
        compiledLine: "console.log(" + variables_1.toJSOutput(line, context) + ");",
    }); },
    declares: declare_1.default
};
exports.CommanNames = Object.keys(commands);
function parseCommand(command, remainder, context) {
    return commands[command] ? commands[command](remainder, context) : { compiledLine: "// SIMON COMPILER ERROR unknown command \"" + command + "\"" };
}
exports.parseCommand = parseCommand;
