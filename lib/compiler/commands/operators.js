"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalDeclaration = exports.getSeperator = exports.getOperator = exports.OperatorSimpleNameMapping = exports.OperatorNameMapping = exports.OperatorSymbolMapping = exports.OperatorConnectors = exports.OperatorConnectorSideMapping = exports.OperratorDirection = void 0;
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
exports.OperatorSimpleNameMapping = {
    'divided by': "divide",
    plus: "add",
    minus: "subtract",
    'multiplied by': "multiply"
};
function getOperator(name) { return exports.OperatorNameMapping[name] || name; }
exports.getOperator = getOperator;
function getSeperator(line) { return exports.OperatorConnectors.find(v => line.indexOf(v) >= 0); }
exports.getSeperator = getSeperator;
function compileOperatorLine(operator, direction, left, right, context, assignTo) {
    switch (operator) {
        default:
            let vals = [left, right];
            if (direction = OperratorDirection.Left) {
                vals = vals.reverse();
            }
            if (!assignTo) {
                assignTo = vals[0];
            }
            if (!context.variables.has(assignTo)) {
                return `// ${variables_1.toJSOutput(assignTo, context)} is not a variable or wasnt declared yet. `;
            }
            return vals.map(v => variables_1.toJSOutput(v, context)).join(` ${exports.OperatorSymbolMapping[operator]}= `) + ';';
    }
}
function evalDeclarationGetFirstIndex(line) {
    const mappings = Object.keys(exports.OperatorSimpleNameMapping);
    let first = null;
    for (let i = 0; i < mappings.length; i++) {
        const start = line.indexOf(mappings[i]);
        const operator = exports.OperatorSimpleNameMapping[mappings[i]];
        if ((start >= 0) &&
            (!first || first.start > start)) {
            first = {
                operator,
                start,
                end: start + mappings[i].length // !seperator ? start + operator.length : line.indexOf(seperator) + seperator.length// : start + mappings[i].length // start + mappings[i].length
            };
        }
    }
    return first;
}
function evalDeclaration(line, context) {
    const firstOperator = evalDeclarationGetFirstIndex(line);
    if (!firstOperator) {
        return variables_1.toJSOutput(line, context);
    }
    return `${variables_1.toJSOutput(line.slice(0, firstOperator.start - 1), context)} ${exports.OperatorSymbolMapping[firstOperator.operator]} ${evalDeclaration(line.slice(firstOperator.end + 1, line.length), context)}`;
}
exports.evalDeclaration = evalDeclaration;
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
        compiledLine: compileOperatorLine(operator, exports.OperatorConnectorSideMapping[seperator], members[0], members[1], context)
    };
}
exports.default = opertate;
