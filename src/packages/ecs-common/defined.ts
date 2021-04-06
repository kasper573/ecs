export const defined = <T>(list: Array<T | undefined>): T[] =>
  list.filter((item): item is T => item !== undefined);
