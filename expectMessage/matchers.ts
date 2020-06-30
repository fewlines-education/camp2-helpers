import { colorize, TerminalCustomStyle } from "./utils/colorizeLog";

class JestAssertionError extends Error {
  matcherResult: any;

  constructor(result: any, callsite: any) {
    super(result.message());
    this.matcherResult = result;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, callsite);
    }
  }
}

const wrapMatcher = (matcher: any, customMessage: string, customStyle: TerminalCustomStyle = {}): any => {
  const newMatcher = (...args: any[]): any => {
    try {
      return matcher(...args);
    } catch (error) {
      if (!error.matcherResult) {
        throw error;
      }

      const { matcherResult } = error;

      if (typeof customMessage !== "string") {
        console.log("been here");

        throw new JestAssertionError(matcherResult, newMatcher);
      }

      const message = (): any => colorize(customMessage, customStyle) + "\n\n" + matcherResult.message();

      throw new JestAssertionError({ ...matcherResult, message }, newMatcher);
    }
  };
  return newMatcher;
};

const wrapMatchers = (matchers: any, customMessage: string, customStyle: TerminalCustomStyle = {}): any => {
  return Object.keys(matchers).reduce((acc, name) => {
    const matcher = matchers[name];

    if (typeof matcher === "function") {
      return {
        ...acc,
        [name]: wrapMatcher(matcher, customMessage, customStyle),
      };
    }

    return {
      ...acc,
      [name]: wrapMatchers(matcher, customMessage, customStyle), // recurse on .not/.resolves/.rejects
    };
  }, {});
};

export default (expect: any): any => {
  // proxy the expect function
  let expectProxy = Object.assign(
    (actual: any, customMessage: string, customStyle: TerminalCustomStyle) =>
      wrapMatchers(expect(actual), customMessage, customStyle), // partially apply expect to get all matchers and chain them
    expect, // clone additional properties on expect
  );

  expectProxy.extend = (o: any): any => {
    expect.extend(o); // add new matchers to expect
    expectProxy = Object.assign(expectProxy, expect); // clone new asymmetric matchers
  };

  return expectProxy;
};
