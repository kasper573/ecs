/**
 * Semantic way to declare a variable as always defined while in fact initializing as undefined.
 * Used when a separate mechanism is trusted to always give the variable a defined value.
 * This is useful when that variable is accessed a lot and guarding it with ? would be redundant or just a formality.
 */
export const trustedUndefined = <T>(): T => (undefined as unknown) as T;
