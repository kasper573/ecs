import { Entity } from "../../ecs/Entity";
import { Describable } from "../../ecs-text/Describable";
import { isLit } from "./Lighter";

export class Ladder extends Entity {
  constructor() {
    super("ladder", undefined, () => [
      new Describable({
        action: () => "Climb ladder",
        describe: () => "You see a ladder.",
        isActive: (entity, world) => isLit(world),
        apply: (entity, world) => {
          world.sceneId = "cliff";
        },
      }),
    ]);
  }
}
