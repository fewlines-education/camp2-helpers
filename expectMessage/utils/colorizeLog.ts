interface ObjectTerminalCustomStyle {
  fg?: string;
  bg?: string;
  effects?: string;
}

export type TerminalCustomStyle = ObjectTerminalCustomStyle | string | number;
interface Styles {
  [key: string]: {
    [key: string]: string;
  };
}

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

const createStyle = (cat: any, styleName?: string): string => {
  return styleName ? `\x1b[${styles[cat][styleName.toLowerCase()]}m` : "";
};

const createDefault = (
  string: string,
  fg: string,
  bg: string,
  effects = ""
): string => {
  return [
    createStyle("fg", fg),
    createStyle("bg", bg),
    createStyle("effects", effects),
    string.toString().replace(/\s*$/, ""),
    fg || bg || effects ? createStyle("effects", "reset") : "",
  ].join("");
};

export const colorize = (
  string: string,
  customStyle: TerminalCustomStyle = {}
): string => {
  if (typeof customStyle === "string" || typeof customStyle === "number") {
    if (customStyle === "code red" || customStyle === 3) {
      return createDefault(string, "yellow", "red", "blink");
    } else if (customStyle === "warning" || customStyle === 2) {
      return createDefault(string, "cyan", "yellow", "");
    } else {
      return createDefault(string, "cyan", "", "dim");
    }
  } else {
    return [
      createStyle("fg", customStyle.fg),
      createStyle("bg", customStyle.bg),
      createStyle("effects", customStyle.effects),
      string.toString().replace(/\s*$/, ""),
      customStyle.fg || customStyle.bg || customStyle.effects
        ? createStyle("effects", "reset")
        : "",
    ].join("");
  }
};
