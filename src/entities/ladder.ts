import { Entity } from "../engine/types/Entity";
import { ObservableTrait } from "../engine/traits/ObservableTrait";
import { isLit } from "./lighter";

export const ladder = Entity.forTraits(
  "ladder",
  new ObservableTrait({
    action: () => "Climb ladder",
    observe: () => "You see a ladder.",
    isActive: (entity, context) => isLit(context),
    apply: (entity, context) => {
      context.roomId = "cliff";
    },
  })
);
