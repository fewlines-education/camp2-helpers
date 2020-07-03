export interface ObjectTerminalCustomStyle {
  fg?: string;
  bg?: string;
  effects?: string;
}
export declare type TerminalCustomStyle =
  | ObjectTerminalCustomStyle
  | string
  | number;

export interface Styles {
  [key: string]: {
    [key: string]: string;
  };
}
