type Nominal<T, K extends string> = [string] extends [T]
  ? NominalString<K>
  : Tagged<T, K>;

type Tagged<T, K extends string> = T & Record<"__TYPE__", K>;

type NominalString<K extends string> = `NominalString<${K}>`;

type PartialFor<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
