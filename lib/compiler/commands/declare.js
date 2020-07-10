"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var variables_1 = require("../variables");
function extractData(line, context) {
    var declareIndicator = line.indexOf("is") >= 0 ? "is" : "are";
    var variableData = line.split(" " + declareIndicator + " ");
    var name = variableData[0];
    return {
        name: name,
        data: variableData[1],
        isNew: !context.variables.includes(name)
    };
}
exports.default = (function (line, context) {
    var _a = extractData(line, context), name = _a.name, data = _a.data, isNew = _a.isNew;
    return {
        declaration: isNew ? name : null,
        compiledLine: "" + (isNew ? 'var ' : '') + variables_1.extractVariableName(name) + " = " + variables_1.toJSOutput(data, context) + ";",
    };
});
