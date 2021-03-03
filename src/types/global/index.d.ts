type Nominal<T, K extends string> = T & Record<"__TYPE__", K>;

type PartialFor<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
