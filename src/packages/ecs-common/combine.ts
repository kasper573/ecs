export function combine<T extends (...args: any) => any>(
  a?: T,
  b?: T
): T | undefined {
  if (a && b) {
    const c = (...args: Parameters<T>): ReturnType<T> => {
      a(...args);
      return b(...args);
    };
    return c as T;
  }
  return a ?? b;
}
