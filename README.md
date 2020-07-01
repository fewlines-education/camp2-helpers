# Camp2 Helpers

## Installation

To install it, add this in your `package.json` file:

```json
"dependencies": {
  "camp2-helpers": "fewlines-education/camp2-helpers#master"
}
```

## Import

To import the whole package, you can import it from the top of your file:

```js
import camp2_helpers from "camp2-helpers";
```

## Utility functions

### expectMessage

This package modifies the jest [expect](https://jestjs.io/docs/en/expect) function and wrap it in a custom package in order to give an extra option to add a message when jest tests fails in Typescript.
It is based the package [jest-expect-message](https://www.npmjs.com/package/jest-expect-message) for custom use.

You need to install `jest` for `expect` to be a global variable.

#### Utilities

The function `expectMessage(value, message, [style])` takes three arguments

- `value` is the value tested against a matcher. It is the same argument referenced in the [Jest documentation](https://jestjs.io/docs/en/expect#expectvalue).
- `message` is a **string** that is printed only if the expect fails.
- `style` is either:
  - an **object** composed of three strings changing respectively the _foreground color_, _background color_ and _effect_ of the message printed.
  - `1`, `2`, or `3`. Each integer correspond to a level of visibility for the message, from the lowest to the most visible color schema.

#### Example

```js
test("simple test", () => {
  expectMessage(1 + 1, "This is a level 3 message", 3).toBe(11);
});

// This test will fail and print "This is a level 3 message"
// in yellow with a red background.
```

#### Documentation

Those are the different arguments you can give to the `style` parameter:

| foreground | background | effect     |
| ---------- | ---------- | ---------- |
| black      | black      | reset      |
| red        | red        | bright     |
| green      | green      | dim        |
| yellow     | yellow     | underscore |
| blue       | blue       | blink      |
| magenta    | magent     | reverse    |
| cyan       | cyan       | hidden     |
| white      | white      |            |

### readCode

### nodeParser

## Type

## Use the created reader

usage ast parser => /\*\*
Usage example:

- Cast student file into string:
  const studentCode = await readCode(
  path.resolve(\_\_dirname, "../src/index.ts")
  );

- Pass the string to the parser, and get the node:
  const treeClass = findNode(studentCode, "Tree");

- Search deeper into the node:
  const isAlive = findNode(treeClass, "isAlive");

expect(isAlive).not.toBe(undefined);
expect(isAlive.abstract).toBe(true);
expect(isAlive.kind).toBe(NODE_KIND.METHOD);

You can search by name, class member name (e.g. "constructor").

To prevent breaking the tests in case of searching something that is not in the ast,
the function returns "undefined".

This is a WIP, if you probably should investigate the ast if you can't find what you are looking for.
\*/

```

```
