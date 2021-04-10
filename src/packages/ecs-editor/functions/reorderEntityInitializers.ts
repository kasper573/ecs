import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { compareEntityInitializers } from "./compareEntityInitializers";

export function reorderEntityInitializers(
  list: EntityInitializer[],
  updated: EntityInitializer
) {
  const siblings = list.filter(
    (e) => e !== updated && e.parentId === updated.parentId
  );
  const push = siblings.filter((e) => e.order >= updated.order);
  for (const e of push) {
    e.order = e.order + 1;
  }
  const nextGroup = [...siblings, updated].sort(compareEntityInitializers);
  for (let i = 0; i < nextGroup.length; i++) {
    nextGroup[i].order = i;
  }
}
