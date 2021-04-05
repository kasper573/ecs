import { Entity } from "./Entity";

export function* descendants(
  start: Entity,
  filter: (e: Entity) => boolean = any,
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
