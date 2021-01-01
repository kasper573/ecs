export const removeItem = <T>(list: T[], item: T) => {
  const index = list.indexOf(item);
  if (index !== -1) {
    list.splice(index, 1);
  }
};
