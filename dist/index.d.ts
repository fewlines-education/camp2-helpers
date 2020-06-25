interface ExpectMessage {
  question: (compare: any, message: string) => void;
  close: () => void;
}

declare const expectMessage: (options: { input: any; output: any }) => ExpectMessage;

export { expectMessage };
