export { default as serializeJS } from "serialize-javascript";

export const deserializeJS = (serializedJavascript: string) =>
  // eslint-disable-next-line no-eval
  eval("(" + serializedJavascript + ")");
