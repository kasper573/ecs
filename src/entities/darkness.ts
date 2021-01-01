import { Entity } from "../engine/types/Entity";
import { ObservableTrait } from "../engine/traits/ObservableTrait";
import { isLit } from "./lighter";

export const darkness = Entity.forTraits(
  "darkness",
  new ObservableTrait({
    observe: () => "It is very dark.",
    isActive: (entity, context) => !isLit(context),
  })
);
