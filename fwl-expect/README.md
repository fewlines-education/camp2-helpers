# Fewlines Readline

This package uses the [NodeJs Readline](https://nodejs.org/api/readline.html) and wrap it in a custom package in order to simplify its use and testing with jest mocks in Typescript.

## Usage

`fwl-readline` is not yet available on npm.
To install it, add this in your `package.json` file:

### Installation

```json
"dependencies": {
  "fwl-readline": "fewlines-education/fwl-readline#master"
}
```

### Import
```js
// example.js
import * as readline from "fwl-readline";

```

### Create a reader

We decided to simplify the initial API of the readline package. For this reason, we only export the `createInterface` function.

This function takes an `object` parameter with two keys:
- `input`: generally the `process.stdin`
- `output`: generally the `process.stdout`

```js
export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

### Type

In the example above, the created `rl` will have the `Reader` type:

```ts
interface Reader {
  question: (query: string, callback: (answer: string) => void) => void;
  close: () => void;
}
```

### Use the created reader

```js
rl.question("Enter something\n> ", (input) => {
  console.log(`User input: "${input}"`);
  rl.close();
});
```

This example will output:
```bash
Enter something
> something
User input: "something"
```

### Mock with jest

```js
jest.mock("fwl-readline", () => {
  return {
    createInterface: () => {
      return {
        question: () => {},
        close: () => {},
      };
    },
  };
});

import functionThatUseFwlRealine from "wherever-you-want"

// [...]
```

This way, the reader won't interfer when you start tests with `jest`.
