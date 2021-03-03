import { EntityInitializer } from "../types/EntityInitializer";

export const createEntityInitializer = (
  props: PartialFor<EntityInitializer, "name">
): EntityInitializer => ({
  name: props.id,
  ...props,
});
