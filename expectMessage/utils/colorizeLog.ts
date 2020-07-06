import {
  ObjectTerminalCustomStyle,
  TerminalCustomStyle,
  Styles,
  Levels,
} from "./colorizeLog.types";

const levels: Levels = {
  level: {
    error: { fg: "yellow", bg: "red", effects: "blink" },
    warning: { fg: "red", effects: "underscore" },
    log: { fg: "cyan" },
  },
};

const styles: Styles = {
  effects: {
    reset: "0",
    bright: "1",
    dim: "2",
    underscore: "4",
    blink: "5",
    reverse: "7",
    hidden: "8",
  },
  fg: {
    black: "30",
    red: "31",
    green: "32",
    yellow: "33",
    blue: "34",
    magenta: "35",
    cyan: "36",
    white: "37",
  },
  bg: {
    black: "40",
    red: "41",
    green: "42",
    yellow: "43",
    blue: "44",
    magenta: "45",
    cyan: "46",
    white: "47",
  },
};

const createStyle = (cat: string, styleName?: string): string => {
  return styleName ? `\x1b[${styles[cat][styleName.toLowerCase()]}m` : "";
};

const createLevelStyle = (cat: string): any => {
  return levels[cat];
};

function createCompleteStyle(
  string: string,
  specs: ObjectTerminalCustomStyle
): string {
  return [
    createStyle("fg", specs.fg),
    createStyle("bg", specs.bg),
    createStyle("effects", specs.effects),
    string.toString().replace(/\s*$/, ""),
    specs.fg || specs.bg || specs.effects
      ? createStyle("effects", "reset")
      : "",
  ].join("");
}

export const colorize = (
  string: string,
  customStyle: TerminalCustomStyle = {}
): string => {
  if (typeof customStyle === "string") {
    const levelStyle = createLevelStyle(customStyle);
    return createCompleteStyle(string, levelStyle);
  } else {
    return createCompleteStyle(string, customStyle);
    // return [
    //   createStyle("fg", customStyle.fg),
    //   createStyle("bg", customStyle.bg),
    //   createStyle("effects", customStyle.effects),
    //   string.toString().replace(/\s*$/, ""),
    //   customStyle.fg || customStyle.bg || customStyle.effects
    //     ? createStyle("effects", "reset")
    //     : "",
    // ].join("");
  }
};
