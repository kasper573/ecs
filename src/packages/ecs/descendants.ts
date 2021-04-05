import { Entity } from "./Entity";
import { EntityCollection } from "./EntityCollection";

export function descendants<Id extends string>(
  start: Entity<Id>,
  filter: (e: Entity<Id>) => boolean = any,
  includeSelf = false
) {
  const selected = new EntityCollection<Id>();
  const queue = includeSelf ? [start] : [...start.children];
  for (let i = 0; i < queue.length; i++) {
    const next = queue[i];
    if (filter(next)) {
      selected.push(next);
      queue.push(...next.children);
    }
  }
  return selected;
}

const any = () => true;
