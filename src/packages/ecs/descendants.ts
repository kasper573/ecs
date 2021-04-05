import { Entity } from "./Entity";

export function* descendants<Id extends string>(
  start: Entity<Id>,
  filter: (e: Entity<Id>) => boolean = any,
  includeSelf = false
) {
  const queue = includeSelf ? [start] : [...start.children];
  for (let i = 0; i < queue.length; i++) {
    const next = queue[i];
    if (filter(next)) {
      yield next;
      queue.push(...next.children);
    }
  }
}

const any = () => true;
