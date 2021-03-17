export const replaceItem = <T>(items: T[], search: T, replace: T): T[] => {
  const index = items.indexOf(search);
  if (index !== -1) {
    const updated = items.slice();
    updated[index] = replace;
    return updated;
  }
  return items;
};
