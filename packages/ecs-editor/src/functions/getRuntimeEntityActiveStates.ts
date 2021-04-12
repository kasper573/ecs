import { System } from "../../../ecs/src/System";
import { EntityInitializerId } from "../../../ecs-serializable/src/definition/EntityInitializer";

export const getRuntimeEntityActiveStates = (system: System) =>
  system.root.activeDescendants.reduce(
    (states, entity) => ({ ...states, [entity.id]: entity.isActive }),
    {} as Record<EntityInitializerId, boolean>
  );
