export function combineTwo<T extends (...args: any) => any>(
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

export function combine<T extends (...args: any) => any>(
  ...fns: Array<T | undefined>
): T | undefined {
  switch (fns.length) {
    case 0:
      return;
    case 1:
      return fns[0];
  }
  return fns.reduce(combineTwo);
}
