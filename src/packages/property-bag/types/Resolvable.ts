export type Resolvable<T> = T extends Function
  ? T
  : T extends boolean
  ? boolean | (() => boolean)
  : T | (() => T);
