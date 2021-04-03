let isCalling = false;

/**
 * Opts out of recursions.
 * (undefined will be returned for recursive calls)
 */
export const noRecursion = <Args extends any[], Result>(
  func: (...args: Args) => Result,
  ...args: Args
): Result | undefined => {
  if (isCalling) {
    return;
  }
  try {
    isCalling = true;
    return func(...args);
  } finally {
    isCalling = false;
  }
};
