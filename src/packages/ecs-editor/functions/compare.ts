import { uniq, without } from "lodash";

export const compare = <T>(prev: T[], next: T[]) => {
  const all = uniq([...prev, ...next]);
  const added = without(all, ...prev);
  const removed = without(all, ...next);
  const same = without(all, ...added, ...removed);
  return [removed, added, same, all] as const;
};
