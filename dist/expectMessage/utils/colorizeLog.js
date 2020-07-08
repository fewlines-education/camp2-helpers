"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const levels = {
    error: { fg: "yellow", bg: "red", effects: "blink" },
    warning: { fg: "red", effects: "underscore" },
    log: { fg: "cyan" },
};
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
const createStyle = (cat, styleName) => {
    return styleName ? `\x1b[${styles[cat][styleName.toLowerCase()]}m` : "";
};
const createLevelStyle = (cat) => {
    return levels[cat] ? levels[cat] : levels.log;
};
function createCompleteStyle(string, specs) {
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
exports.colorize = (string, customStyle = {}) => {
    return createCompleteStyle(string, customStyle);
};
exports.defaultColorize = (string, customStyle) => {
    return createCompleteStyle(string, createLevelStyle(customStyle));
};
//# sourceMappingURL=colorizeLog.js.map