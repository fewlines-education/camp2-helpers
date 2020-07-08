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
function findNode(code, name) {
    if (typeof code === "string") {
        const ast = recast_1.parse(code, {
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
    if (code.body) {
        return code.body.body.find((node) => {
            return node.key.name === name;
        });
    }
    return undefined;
}
exports.findNode = findNode;
//# sourceMappingURL=astNodeParser.js.map