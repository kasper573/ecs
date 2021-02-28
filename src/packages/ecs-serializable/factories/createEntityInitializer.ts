import { EntityInitializer } from "../types/EntityInitializer";

export const createEntityInitializer = (
  props: EntityInitializer
): EntityInitializer => ({
  ...props,
});
