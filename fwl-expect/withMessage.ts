import "jest/extend-expect";

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

const wrapMatcher = (matcher: any, customMessage: string): any => {
  const newMatcher = (...args: any[]) => {
    try {
      return matcher(...args);
    } catch (error) {
      if (!error.matcherResult) {
        throw error;
      }
      const { matcherResult } = error;

      if (typeof customMessage !== "string" || customMessage.length < 1) {
        throw new JestAssertionError(matcherResult, newMatcher);
      }

      const message = () => customMessage + "\n\n" + matcherResult.message();

      throw new JestAssertionError({ ...matcherResult, message }, newMatcher);
    }
  };
  return newMatcher;
};

const wrapMatchers = (matchers: any, customMessage: string): any => {
  return Object.keys(matchers).reduce((acc, name) => {
    const matcher = matchers[name];

    if (typeof matcher === "function") {
      return {
        ...acc,
        [name]: wrapMatcher(matcher, customMessage),
      };
    }

    return {
      ...acc,
      [name]: wrapMatchers(matcher, customMessage), // recurse on .not/.resolves/.rejects
    };
  }, {});
};

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
