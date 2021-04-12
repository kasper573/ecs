import { groupBy } from "lodash";
import { compare } from "./compare";

export const compareBy = <T, K extends keyof T>(
  prev: T[],
  next: T[],
  getKey: (item: T) => T[K]
) => {
  const [removedKeys, addedKeys, sameKeys] = compare(
    prev.map(getKey),
    next.map(getKey)
  );
  const prevGroups = groupBy(prev, getKey);
  const nextGroups = groupBy(next, getKey);
  const removed = removedKeys.map(
    (id) => prevGroups[(id as unknown) as string][0]
  );
  const added = addedKeys.map((id) => nextGroups[(id as unknown) as string][0]);
  const same = sameKeys.map((id) => nextGroups[(id as unknown) as string][0]);
  const all = [...removed, ...same, ...added];
  return [removed, added, same, all] as const;
};
