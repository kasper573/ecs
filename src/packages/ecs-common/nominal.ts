// Type safe operations on Records using a Nominal type as key

export const remove = <T extends Record<keyof any, unknown>>(
  o: T,
  key: keyof T
) => {
  const wasRemoved = o.hasOwnProperty(key);
  delete (o as Record<keyof any, ValueOf<T>>)[key];
  return wasRemoved;
};

export const values = <T extends Record<keyof any, unknown>>(o: T) =>
  Object.values(o) as ValueOf<T>[];

export const keys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;

export type ValueOf<T> = T extends Record<keyof any, infer V> ? V : never;
