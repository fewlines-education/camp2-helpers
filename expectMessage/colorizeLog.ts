const styles = {
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

interface TerminalCustomStyle {
  fg?: string;
  bg?: string;
  effect?: string;
}

export default (expect: any): any => {
  // proxy the expect function
  let expectProxy = Object.assign(
    (actual: any, customMessage: string) => wrapMatchers(expect(actual), customMessage), // partially apply expect to get all matchers and chain them
    expect, // clone additional properties on expect
  );

  expectProxy.extend = (o: any): any => {
    expect.extend(o); // add new matchers to expect
    expectProxy = Object.assign(expectProxy, expect); // clone new asymmetric matchers
  };

  return expectProxy;
};

const createStyle = (styleName: string, cat: any): string => {
  return styleName ? `\x1b[${styles[cat][styleName.toLowerCase()]}m` : "";
};

export const colorize = (string: string, customStyle: TerminalCustomStyle = {}): string => {
  return [
    createStyle(customStyle.fg, "fg"),
    createStyle(customStyle.bg, "bg"),
    createStyle(customStyle.effect, "effects"),
    string.toString().replace(/\s*$/, ""),
    customStyle.fg || customStyle.bg || customStyle.effect ? createStyle("reset", "effects") : "",
  ].join("");
};
