"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var JestAssertionError = /** @class */ (function (_super) {
    __extends(JestAssertionError, _super);
    function JestAssertionError(result, callsite) {
        var _this = _super.call(this, result.message()) || this;
        _this.matcherResult = result;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, callsite);
        }
        return _this;
    }
    return JestAssertionError;
}(Error));
var wrapMatcher = function (matcher, customMessage) {
    var newMatcher = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            return matcher.apply(void 0, args);
        }
        catch (error) {
            if (!error.matcherResult) {
                throw error;
            }
            var matcherResult_1 = error.matcherResult;
            if (typeof customMessage !== "string" || customMessage.length < 1) {
                throw new JestAssertionError(matcherResult_1, newMatcher);
            }
            var message = function () { return customMessage + "\n\n" + matcherResult_1.message(); };
            throw new JestAssertionError(__assign(__assign({}, matcherResult_1), { message: message }), newMatcher);
        }
    };
    return newMatcher;
};
var wrapMatchers = function (matchers, customMessage) {
    return Object.keys(matchers).reduce(function (acc, name) {
        var _a, _b;
        var matcher = matchers[name];
        if (typeof matcher === "function") {
            return __assign(__assign({}, acc), (_a = {}, _a[name] = wrapMatcher(matcher, customMessage), _a));
        }
        return __assign(__assign({}, acc), (_b = {}, _b[name] = wrapMatchers(matcher, customMessage), _b));
    }, {});
};
exports["default"] = (function (expect) {
    // proxy the expect function
    var expectProxy = Object.assign(function (actual, customMessage) { return wrapMatchers(expect(actual), customMessage); }, // partially apply expect to get all matchers and chain them
    expect);
    expectProxy.extend = function (o) {
        expect.extend(o); // add new matchers to expect
        expectProxy = Object.assign(expectProxy, expect); // clone new asymmetric matchers
    };
    return expectProxy;
});
