export type IfContains<T, SearchFor, Yes, No> = [SearchFor] extends [T]
  ? Yes
  : No;
