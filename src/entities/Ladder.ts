import { Entity } from "../engine/types/Entity";
import { Observable } from "../engine/components/Observable";
import { isLit } from "./Lighter";

export class Ladder extends Entity {
  constructor() {
    super("ladder", undefined, () => [
      new Observable({
        action: () => "Climb ladder",
        observe: () => "You see a ladder.",
        isActive: (entity, world) => isLit(world),
        apply: (entity, world) => {
          world.sceneId = "cliff";
        },
      }),
    ]);
  }
}
