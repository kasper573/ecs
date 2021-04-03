// NOTE we avoid distributivity by wrapping T in []
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

import { IfContains } from "./IfContains";

export type Declarable<T, DeclarationContext> = [T] extends [
  (...args: any) => any
]
  ? T
  : IfContains<
      T,
      undefined,
      | T
      | Declarative<DeclarationContext, void>
      | Declarative<DeclarationContext, T>, // Also accept void functions, it's practically the same as undefined
      T | Declarative<DeclarationContext, T>
    >;

export type Declarative<DeclarationContext, T> = (
  context: DeclarationContext
) => T;
