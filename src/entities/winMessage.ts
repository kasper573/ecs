import { Entity } from "../engine/types/Entity";
import { Observable } from "../engine/components/Observable";

export const winMessage = Entity.forComponents(
  "win-message",
  new Observable({ observe: () => "You win!" })
);
