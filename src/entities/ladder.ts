import { Entity } from "../engine/types/Entity";
import { Observable } from "../engine/components/Observable";
import { isLit } from "./lighter";

export const ladder = Entity.forComponents(
  "ladder",
  new Observable({
    action: () => "Climb ladder",
    observe: () => "You see a ladder.",
    isActive: (entity, world) => isLit(world),
    apply: (entity, world) => {
      world.sceneId = "cliff";
    },
  })
);
