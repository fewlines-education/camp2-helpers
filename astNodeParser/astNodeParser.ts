import { parse } from "recast";
import { namedTypes } from "ast-types";
import * as tsParser from "recast/parsers/typescript";

export enum NODE_TYPE {
  CLASS_DECLARATION = "ClassDeclaration",
  CLASS_PROPERTY = "ClassProperty",
  CLASS_METHOD = "ClassMethod",
  VARIABLE_DECLARATION = "VariableDeclaration",
  EXPORT_NAMED_DECLARATION = "ExportNamedDeclaration",
}

export enum NODE_KIND {
  METHOD = "method",
  CONSTRUCTOR = "constructor",
}

export enum ACCESSIBILITY {
  PUBLIC = "public",
  PRIVATE = "private",
  PROTECTED = "protected",
}

export interface Node extends namedTypes.Node {
  id: Node;
  name: string;
  body: Node[] & { body: Node[] };
  declarations: Node[];
  declaration: Node;
  key: Node;
  abstract: boolean;
  static: boolean;
  readonly: boolean;
  kind: NODE_KIND;
  accessibility: ACCESSIBILITY;
  async: boolean;
  params: Node[];
  value: Node;
}

export function findNode(
  studentCode: string | Node,
  name: string
): Node | undefined {
  if (typeof studentCode === "string") {
    const ast = parse(studentCode, {
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

  if (studentCode.body) {
    return studentCode.body.body.find((node: Node) => {
      return node.key.name === name;
    });
  }

  return undefined;
}
