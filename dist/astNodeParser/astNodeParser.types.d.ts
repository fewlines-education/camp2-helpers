import { namedTypes } from "ast-types";
export declare enum NODE_TYPE {
    CLASS_DECLARATION = "ClassDeclaration",
    CLASS_PROPERTY = "ClassProperty",
    CLASS_METHOD = "ClassMethod",
    VARIABLE_DECLARATION = "VariableDeclaration",
    EXPORT_NAMED_DECLARATION = "ExportNamedDeclaration"
}
export declare enum NODE_KIND {
    METHOD = "method",
    CONSTRUCTOR = "constructor"
}
export declare enum ACCESSIBILITY {
    PUBLIC = "public",
    PRIVATE = "private",
    PROTECTED = "protected"
}
export interface Node extends namedTypes.Node {
    id: Node;
    name: string;
    body: Node[] & {
        body: Node[];
    };
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
