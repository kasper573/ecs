export type WithoutMutations<T> = T extends Array<infer Item>
  ? Omit<T, keyof Array<Item>> & ReadonlyArray<Item>
  : never;
