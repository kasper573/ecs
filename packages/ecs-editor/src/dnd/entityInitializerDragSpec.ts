import { EntityInitializer } from "../../../ecs-serializable/src/definition/EntityInitializer";
import { DNDType } from "./DNDType";

export const entityInitializerDragSpec = (entity: EntityInitializer) => ({
  options: { dropEffect: "move" },
  type: DNDType.EntityInitializer,
  item: entity,
});
