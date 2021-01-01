export const filterInstances = <T, C extends T>(
  list: T[],
  type: new (...args: any[]) => C
) => list.filter((item) => item instanceof type) as C[];
