type NominalString<Identifier extends string> = `NominalString<${Identifier}>`;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type PartialFor<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
