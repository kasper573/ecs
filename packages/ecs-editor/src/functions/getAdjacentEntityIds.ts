import { EntityId, EntityState } from "@reduxjs/toolkit";

export function getAdjacentEntityIds<T, Id extends EntityId>(
  { ids }: EntityState<T>,
  id: Id
) {
  const index = ids.indexOf(id);
  const before = ids[index - 1] as Id;
  const after = ids[index + 1] as Id;
  return [before, after] as const;
}
