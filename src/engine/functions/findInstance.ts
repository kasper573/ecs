export const findInstance = <T, C extends T>(
  list: T[],
  type: new (...args: any[]) => C
) => list.find((item) => item instanceof type) as C | undefined;
