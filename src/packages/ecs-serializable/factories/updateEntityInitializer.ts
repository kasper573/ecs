import { EntityInitializer } from "../types/EntityInitializer";

export const updateEntityInitializer = (
  base: EntityInitializer,
  props: Partial<EntityInitializer>
): EntityInitializer => ({
  ...base,
  ...props,
});
