// NOTE we avoid distributivity by wrapping T in []
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
export type Resolvable<T> = [T] extends [(...args: any) => any]
  ? T
  : IfContains<
      T,
      undefined,
      T | (() => void) | (() => T), // Also accept void functions, it's practically the same as undefined
      T | (() => T)
    >;

type IfContains<T, S, A, B> = Extract<T, S> extends S ? A : B;
