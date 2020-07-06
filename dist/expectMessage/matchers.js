"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorizeLog_1 = require("./utils/colorizeLog");
class JestAssertionError extends Error {
    constructor(result, callsite) {
        super(result.message());
        this.matcherResult = result;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, callsite);
        }
    }
}
const wrapMatcher = (matcher, customMessage, customStyle = {}) => {
    const newMatcher = (...args) => {
        try {
            return matcher(...args);
        }
        catch (error) {
            if (!error.matcherResult) {
                throw error;
            }
            const { matcherResult } = error;
            if (typeof customMessage !== "string") {
                throw new JestAssertionError(matcherResult, newMatcher);
            }
            if (typeof customStyle === "string") {
                const message = () => colorizeLog_1.customColorize(customMessage, customStyle) +
                    "\n\n" +
                    matcherResult.message();
                throw new JestAssertionError(Object.assign(Object.assign({}, matcherResult), { message }), newMatcher);
            }
            else {
                const message = () => colorizeLog_1.colorize(customMessage, customStyle) +
                    "\n\n" +
                    matcherResult.message();
                throw new JestAssertionError(Object.assign(Object.assign({}, matcherResult), { message }), newMatcher);
            }
        }
    };
    return newMatcher;
};
const wrapMatchers = (matchers, customMessage, customStyle = {}) => {
    return Object.keys(matchers).reduce((acc, name) => {
        const matcher = matchers[name];
        if (typeof matcher === "function") {
            return Object.assign(Object.assign({}, acc), { [name]: wrapMatcher(matcher, customMessage, customStyle) });
        }
        return Object.assign(Object.assign({}, acc), { [name]: wrapMatchers(matcher, customMessage, customStyle) });
    }, {});
};
exports.default = (expect) => {
    let expectProxy = Object.assign((actual, customMessage, customStyle) => wrapMatchers(expect(actual), customMessage, customStyle), expect);
    expectProxy.extend = (o) => {
        expect.extend(o);
        expectProxy = Object.assign(expectProxy, expect);
    };
    return expectProxy;
};
//# sourceMappingURL=matchers.js.map