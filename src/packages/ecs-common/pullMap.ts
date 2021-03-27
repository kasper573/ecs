/**
 * Gets the specified key from the map.
 * (If the key is not available, sets the specified key with the default value)
 */
export const pullMap = <K, V>(map: Map<K, V>, key: K, defaultValue: V): V => {
  if (!map.has(key)) {
    map.set(key, defaultValue);
    return defaultValue;
  }
  return map.get(key)!;
};
