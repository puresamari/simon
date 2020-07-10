"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimonLangContext = exports.SimonLangVariableType = void 0;
class SimonLangVariableType extends Map {
    constructor() {
        super([]);
    }
}
exports.SimonLangVariableType = SimonLangVariableType;
class SimonLangContext {
    constructor(variables = new SimonLangVariableType()) {
        this.variables = variables;
    }
}
exports.SimonLangContext = SimonLangContext;
