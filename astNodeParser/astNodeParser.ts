import { parse } from "recast";
import * as tsParser from "recast/parsers/typescript";
import { Node } from "./astNodeParser.types";

export function findNode(code: string | Node, name: string): Node | undefined {
  if (typeof code === "string") {
    const ast = parse(code, {
      parser: tsParser,
    });

    return ast.program.body.find((node: Node) => {
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
    return code.body.body.find((node: Node) => {
      return node.key.name === name;
    });
  }

  return undefined;
}
