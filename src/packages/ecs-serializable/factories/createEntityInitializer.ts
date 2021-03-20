import { EntityInitializer } from "../types/EntityInitializer";

export const createEntityInitializer = (
  props: PartialFor<EntityInitializer, "name" | "components">
): EntityInitializer => ({
  name: props.id,
  components: [],
  ...props,
});
