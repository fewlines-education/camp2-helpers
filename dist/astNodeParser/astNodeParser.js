"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const recast_1 = require("recast");
const tsParser = __importStar(require("recast/parsers/typescript"));
var NODE_TYPE;
(function (NODE_TYPE) {
    NODE_TYPE["CLASS_DECLARATION"] = "ClassDeclaration";
    NODE_TYPE["CLASS_PROPERTY"] = "ClassProperty";
    NODE_TYPE["CLASS_METHOD"] = "ClassMethod";
    NODE_TYPE["VARIABLE_DECLARATION"] = "VariableDeclaration";
    NODE_TYPE["EXPORT_NAMED_DECLARATION"] = "ExportNamedDeclaration";
})(NODE_TYPE = exports.NODE_TYPE || (exports.NODE_TYPE = {}));
var NODE_KIND;
(function (NODE_KIND) {
    NODE_KIND["METHOD"] = "method";
    NODE_KIND["CONSTRUCTOR"] = "constructor";
})(NODE_KIND = exports.NODE_KIND || (exports.NODE_KIND = {}));
var ACCESSIBILITY;
(function (ACCESSIBILITY) {
    ACCESSIBILITY["PUBLIC"] = "public";
    ACCESSIBILITY["PRIVATE"] = "private";
    ACCESSIBILITY["PROTECTED"] = "protected";
})(ACCESSIBILITY = exports.ACCESSIBILITY || (exports.ACCESSIBILITY = {}));
function findNode(studentCode, name) {
    if (typeof studentCode === "string") {
        const ast = recast_1.parse(studentCode, {
            parser: tsParser,
        });
        return ast.program.body.find((node) => {
            if (node.declaration) {
                return node.declaration.id.name === name;
            }
            if (node.declarations) {
                return node.declarations[0].id.name === name;
            }
            return node.id.name === name;
        });
    }
    if (studentCode.body) {
        return studentCode.body.body.find((node) => {
            return node.key.name === name;
        });
    }
    return undefined;
}
exports.findNode = findNode;
//# sourceMappingURL=astNodeParser.js.map