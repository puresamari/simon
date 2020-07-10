"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = require("../variables");
function extractData(line, context) {
    const declareIndicator = line.indexOf("is") >= 0 ? "is" : "are";
    const variableData = line.split(` ${declareIndicator} `);
    const name = variableData[0];
    return {
        name,
        data: variableData[1],
        isNew: !context.variables.has(name)
    };
}
exports.default = (command, line, context) => {
    const { name, data, isNew } = extractData(line, context);
    return {
        declaration: isNew ? { name, type: variables_1.detectType(data) } : null,
        compiledLine: `${isNew ? 'var ' : ''}${variables_1.extractVariableName(name)} = ${variables_1.toJSOutput(data, context)};`,
    };
};
