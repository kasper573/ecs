// Type safe operations on Records using a Nominal type as key

export const remove = <T extends Record<keyof any, unknown>>(
  o: T,
  key: keyof T
) => {
  const wasRemoved = o.hasOwnProperty(key);
  delete o[key];
  return wasRemoved;
};

export const keys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;
