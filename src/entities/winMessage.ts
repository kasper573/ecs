import { Entity } from "../engine/types/Entity";
import { ObservableTrait } from "../engine/traits/ObservableTrait";

export const winMessage = Entity.forTraits(
  "win-message",
  new ObservableTrait({ observe: () => "You win!" })
);
