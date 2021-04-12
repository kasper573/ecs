import { EntityInitializer } from "../../ecs-serializable/definition/EntityInitializer";
import { DNDType } from "./DNDType";

export const entityInitializerDragSpec = (entity: EntityInitializer) => ({
  options: { dropEffect: "move" },
  type: DNDType.EntityInitializer,
  item: entity,
});
