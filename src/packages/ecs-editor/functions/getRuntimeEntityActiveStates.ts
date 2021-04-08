import { System } from "../../ecs/System";
import { EntityInitializerId } from "../../ecs-serializable/types/EntityInitializer";

export const getRuntimeEntityActiveStates = (system: System) =>
  system.root.activeDescendants.reduce(
    (states, entity) => ({ ...states, [entity.id]: entity.isActive }),
    {} as Record<EntityInitializerId, boolean>
  );
