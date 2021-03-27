// Type safe operations on Records using a Nominal type as key

export const get = <T extends Record<keyof any, unknown>>(o: T, key: keyof T) =>
  o[key] as ValueOf<T> | undefined;

export const set = <T extends Record<keyof any, unknown>>(
  o: T,
  key: keyof T,
  value: ValueOf<T>
): T => {
  (o as Record<keyof any, ValueOf<T>>)[key] = value;
  return o;
};

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
