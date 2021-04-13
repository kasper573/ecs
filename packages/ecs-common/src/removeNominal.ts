import { NominalString } from "./NominalString";

/**
 * Convenience function for deleting entries of records using a
 * NominalString as key without the need of manual type assertions.
 */
export const removeNominal = <
  T extends Record<K, unknown>,
  K extends NominalString<Identifier>,
  Identifier extends string
>(
  o: T,
  key: K
) => {
  const wasRemoved = o.hasOwnProperty(key);
  delete o[key];
  return wasRemoved;
};
