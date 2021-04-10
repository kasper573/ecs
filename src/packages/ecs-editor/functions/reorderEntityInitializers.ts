import { without } from "lodash";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { compareEntityInitializers } from "./compareEntityInitializers";

export function reorderEntityInitializers(
  all: EntityInitializer[],
  subject: EntityInitializer,
  newOrder?: number
) {
  const group = all.filter((e) => e.parentId === subject.parentId);
  subject.order = newOrder ?? getHighestOrderOfGroup(group, subject) + 1;

  const siblings = without(group, subject);
  const push = siblings.filter((e) => e.order >= subject.order);
  for (const e of push) {
    e.order = e.order + 1;
  }
  const nextGroup = [...siblings, subject].sort(compareEntityInitializers);
  for (let i = 0; i < nextGroup.length; i++) {
    nextGroup[i].order = i;
  }
}

function getHighestOrderOfGroup(
  group: EntityInitializer[],
  subject: EntityInitializer
): number {
  return group
    .filter((e) => e.parentId === subject.parentId)
    .map((e) => e.order)
    .reduce((a, b) => Math.max(a, b), 0);
}
