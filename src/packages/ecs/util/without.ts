export function without<T>(list: T[], ...removed: T[]) {
  const left: T[] = [];
  for (const item of list) {
    if (!removed.includes(item)) {
      left.push(item);
    }
  }
  return left;
}
