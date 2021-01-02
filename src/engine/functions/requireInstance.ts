import { findInstance } from "./findInstance";

export const requireInstance = <T, C extends T>(
  list: T[],
  type: new (...args: any[]) => C
) => {
  const instance = findInstance(list, type);
  if (!instance) {
    throw new Error(`Could not find instance of ${type?.name}`);
  }
  return instance;
};
