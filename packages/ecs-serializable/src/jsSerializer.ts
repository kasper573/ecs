export { default as serializeJS } from "serialize-javascript";

export const deserializeJS = <F extends (...args: any) => any>(
  serializedJavascript: string
): F =>
  // eslint-disable-next-line no-eval
  eval("(" + serializedJavascript + ")");
