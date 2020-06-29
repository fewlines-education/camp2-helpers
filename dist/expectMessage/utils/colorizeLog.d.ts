export interface TerminalCustomStyle {
    fg?: string;
    bg?: string;
    effects?: string;
}
export declare const colorize: (string: string, customStyle?: TerminalCustomStyle) => string;
