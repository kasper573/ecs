type Nominal<T, K> = T & { __TYPE__: K };

type PartialFor<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
