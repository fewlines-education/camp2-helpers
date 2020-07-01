interface ObjectTerminalCustomStyle {
    fg?: string;
    bg?: string;
    effects?: string;
}
export declare type TerminalCustomStyle = ObjectTerminalCustomStyle | string | number;
export declare const colorize: (string: string, customStyle?: TerminalCustomStyle) => string;
export {};
