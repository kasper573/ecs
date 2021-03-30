export function defined<T>(items: Array<T | undefined>): T[] {
  return items.filter((item): item is T => item !== undefined);
}
