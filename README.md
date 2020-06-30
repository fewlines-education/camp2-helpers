# Camp2 Helpers

This package modifies the jest [expect](https://jestjs.io/docs/en/expect) function and wrap it in a custom package in order to give an extra option to add a message when jest tests fails in Typescript.
It is based the package [jest-expect-message](https://www.npmjs.com/package/jest-expect-message) for custom use.

## Usage

### Installation

To install it, add this in your `package.json` file:

```json
"dependencies": {
  "camp2-helpers": "fewlines-education/camp2-helpers#master"
}
```

### Import

### Utility functions

#### readline

#### nodeParser

#### expectMessage

### Type

### Use the created reader

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
