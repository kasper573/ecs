export type Resolvable<T> = (() => T) | T;

export type Resolved<T> = T extends () => infer U ? U : T;

export function resolve<T>(resolvable: T): Resolved<T> {
  return typeof resolvable === "function" ? resolvable() : resolvable;
}
