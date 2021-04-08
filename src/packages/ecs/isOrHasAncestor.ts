import { Entity } from "./Entity";

export function isOrHasAncestor(start: Entity, search: Entity) {
  let next: Entity | undefined = start;
  while (next) {
    if (next === search) {
      return true;
    }
    next = next.parent;
  }
  return false;
}
