export interface ObjectTerminalCustomStyle {
    fg?: string;
    bg?: string;
    effects?: string;
}
export declare type TerminalCustomStyle = ObjectTerminalCustomStyle | string;
export interface Styles {
    [key: string]: {
        [key: string]: string;
    };
}
export interface Levels {
    [key: string]: ObjectTerminalCustomStyle;
}
