"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeperator = exports.getOperator = exports.OperatorNameMapping = exports.OperatorSymbolMapping = exports.OperatorConnectors = exports.OperatorConnectorSideMapping = exports.OperratorDirection = void 0;
const variables_1 = require("../variables");
var OperratorDirection;
(function (OperratorDirection) {
    OperratorDirection[OperratorDirection["Left"] = 0] = "Left";
    OperratorDirection[OperratorDirection["Right"] = 1] = "Right";
})(OperratorDirection = exports.OperratorDirection || (exports.OperratorDirection = {}));
exports.OperatorConnectorSideMapping = {
    to: OperratorDirection.Left,
    from: OperratorDirection.Left,
    by: OperratorDirection.Right,
    with: OperratorDirection.Right,
};
exports.OperatorConnectors = Object.keys(exports.OperatorConnectorSideMapping);
exports.OperatorSymbolMapping = {
    add: "+",
    subtract: "-",
    divide: "/",
    multiply: "*",
};
exports.OperatorNameMapping = {
    adds: "add",
    subtracts: "subtract",
    divides: "divide",
    multiplies: "multiply",
};
function getOperator(name) { return exports.OperatorNameMapping[name] || name; }
exports.getOperator = getOperator;
function getSeperator(line) { return exports.OperatorConnectors.find(v => line.indexOf(v) >= 0) || name; }
exports.getSeperator = getSeperator;
function compileOperatorLine(operator, seperator, left, right, context) {
    switch (operator) {
        default:
            let vals = [left, right];
            if (exports.OperatorConnectorSideMapping[seperator] === OperratorDirection.Left) {
                vals = vals.reverse();
            }
            return vals.map(v => variables_1.toJSOutput(v, context)).join(` ${exports.OperatorSymbolMapping[operator]} `) + ';';
    }
}
function opertate(command, line, context) {
    const operator = getOperator(command);
    if (!operator) {
        return { compiledLine: `// Operator ${command} not valid or known!` };
    }
    const seperator = getSeperator(line);
    if (!seperator) {
        return { compiledLine: `// Seperator ${seperator} not valid or known for operator ${operator}!` };
    }
    const members = line.split(` ${seperator} `);
    return {
        compiledLine: compileOperatorLine(operator, seperator, members[0], members[1], context)
    };
}
exports.default = opertate;
