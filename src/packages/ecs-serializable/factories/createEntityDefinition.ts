import { EntityDefinition } from "../types/EntityDefinition";

export const createEntityDefinition = (
  props: PartialFor<EntityDefinition, "components">
): EntityDefinition => ({
  components: [],
  ...props,
});
